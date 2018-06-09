var mw = {};

mw.config = new Map();
mw.config.set("wgContentLanguage", "en");
mw.config.set("wgUserLanguage", "en");
mw.notify = function() { console.log(...arguments) };

var jQuery = () => ({
  button: () => ({}),
  dialog: () => ({}),
  tabs: () => ({}),
})

window.jQuery = jQuery;
window.mw = mw;