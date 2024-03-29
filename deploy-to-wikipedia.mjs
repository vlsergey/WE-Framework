/* eslint-env node */

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import fs from 'fs';
import HttpsProxyAgent from 'https-proxy-agent';
import fetchOriginal from 'node-fetch';

const cookieStorage = {fake: 'fake'};

const fetch = (url, options) => {
  const formatCookies = () => Object.keys(cookieStorage)
    .map(key => `${key}=${cookieStorage[key]}`)
    .reduce((a, c) => a ? a + '; ' + c : c);

  const cookieHeader = formatCookies();
  // console.log( 'Add additional cookie header to URL \'' + url + '\':' + cookieHeader );
  const newOptions = {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookieHeader,
    },
  };

  const originalResult = fetchOriginal(url, newOptions);
  return originalResult.then(request => {
    const setCookieHeaders = request.headers.raw()['set-cookie'];
    if (setCookieHeaders) {
      setCookieHeaders.forEach(c => {
        if (typeof c === 'string') {
          // console.log( 'Cookie received: ' + c );
          const key = c.substring(0, c.indexOf('='));
          const value = c.substring(c.indexOf('=') + 1, c.indexOf(';'));
          cookieStorage[key] = value;
          // console.log( 'Cookie set: ' + key + '=' + value );
        }
      });
    }
    return request;
  });
};

const toUrlencoded = data => Object.keys(data)
  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  .reduce((a, c) => a ? a + '&' + c : c);

const lgname = process.env.WIKIPEDIA_LGNAME;
const lgpassword = process.env.WIKIPEDIA_LGPASSWORD;
const httpsProxy = process.env.NODE_FETCH_HTTPS_PROXY;

if (!lgname)
  throw new Error('environment variable WIKIPEDIA_LGNAME is not specified...');
if (!lgpassword)
  throw new Error('environment variable WIKIPEDIA_LGPASSWORD is not specified...');

let content = fs.readFileSync('./dist/app.bundle.js', 'utf-8');
content = content.replaceAll('//fb.me', '//fb-removeme.me');

const defaultFetchOptions = {
  method: 'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
};

if (httpsProxy) {
  defaultFetchOptions.agent = new HttpsProxyAgent(httpsProxy);
  // ignore SSL problems
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

console.log('Fetching login token...');

const loginTokenPromise = fetch('https://ru.wikipedia.org/w/api.php?action=query&meta=tokens&type=login&format=json', {
  ...defaultFetchOptions,
}).then(res => res.json())
  .then(json => json.query.tokens.logintoken);

const loginPromise = loginTokenPromise.then(logintoken => {
  console.log(`Login ${lgname} with token ${logintoken}...`);

  return fetch('https://ru.wikipedia.org/w/api.php', {
    ...defaultFetchOptions,
    body: toUrlencoded({
      action: 'login',
      lgname,
      lgpassword,
      lgtoken: logintoken,
      format: 'json',
    }),
  }).then(res => res.json())
    .then(json => { const {login} = json;
      console.log(`Login result is ${login.result}`);
      if (login.result !== 'Success') {
        console.log(login);
        throw new Error(`Unable to login as ${lgname}`);
      }
    });
});

const csrfTokenPromise = loginPromise.then(() => {
  console.log('Obtaining CSRF token...');

  return fetch('https://ru.wikipedia.org/w/api.php?action=query&meta=tokens&type=csrf&format=json', {
    ...defaultFetchOptions,
  }).then(res => res.json())
    .then(json => json.query.tokens.csrftoken);
});

void csrfTokenPromise.then(csrftoken => {
  const articleName = 'User:Vlsergey/wef.js';
  console.log('Uploading app.bundle.js as ' + articleName + '...');

  return fetch('https://ru.wikipedia.org/w/api.php', {
    ...defaultFetchOptions,
    body: toUrlencoded({
      action: 'edit',
      title: articleName,
      text: content,
      summary: 'Automatically upload by deploy script',
      minor: '1',
      bot: '1',
      token: csrftoken,
      format: 'json',
    }),
  }).then(res => res.json())
    .then(json => { console.log(json); });
});
