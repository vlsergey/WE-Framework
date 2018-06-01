
export function convertGregorianToJulian( year, month, day ) {
  return convertGregorianToJulianDayImpl( convertGregorianToJulianDayImpl( Number( year ), Number( month ), Number( day ), true ) );
}

function convertGregorianToJulianDayImpl( year, month, day, fixNoon ) {
  const a = 1721425.5 - 1 ;
  const b = 365 * ( year - 1 ) ;
  const c = Math.floor( ( year - 1 ) / 4 );
  const d = -Math.floor( ( year - 1 ) / 100 ) ;
  const e = Math.floor( ( year - 1 ) / 400 );
  const f = Math.floor( ( 367 * month - 362 ) / 12 + ( month <= 2 ? 0 : isLeapGregorianYear( year ) ? -1 : -2 ) + day );
  return a + b + c + d + e + f + ( fixNoon ? 0.5 : 0 );
}

function convertJulianDayToGregorianImpl( julianDay ) {
  const wjd = Math.floor( julianDay - 0.5 ) + 0.5;
  const depoch = wjd - 1721425.5;
  const quadricent = Math.floor( depoch / 146097 );
  const dqc = _mod( depoch, 146097 );
  const cent = Math.floor( dqc / 36524 );
  const dcent = _mod( dqc, 36524 );
  const quad = Math.floor( dcent / 1461 );
  const dquad = _mod( dcent, 1461 );
  const yindex = Math.floor( dquad / 365 );
  let year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
  if ( !( cent == 4 || yindex == 4 ) ) {
    year++;
  }
  const yearday = wjd - convertGregorianToJulianDayImpl( year, 1, 1, false );
  const leapadj = wjd < convertGregorianToJulianDayImpl( year, 3, 1, false ) ? 0 : isLeapGregorianYear( year ) ? 1 : 2 ;
  const month = Math.floor( ( ( yearday + leapadj ) * 12 + 373 ) / 367 );
  const day = wjd - convertGregorianToJulianDayImpl( year, month, 1, false ) + 1;
  return new Array( year, month, floor2( day ) );
}

// function convertJulianDayToJulianImpl ( julianDay ) {
//   const b = 0;
//   const c = julianDay + 32082;
//   const d = floor2( ( 4 * c + 3 ) / 1461 );
//   const e = c - floor2( 1461 * d / 4 );
//   const m = floor2( ( 5 * e + 2 ) / 153 );
//   const day = e - floor2( ( 153 * m + 2 ) / 5 ) + 1;
//   const month = m + 3 - 12 * floor2( m / 10 );
//   const year = 100 * b + d - 4800 + floor2( m / 10 );
//   return new Array( year, month, day );
// }

export function convertJulianToGregorian( year, month, day ) {
  return convertJulianDayToGregorianImpl( convertJulianToJulianDayImpl( Number( year ), Number( month ), Number( day ) ) );
}

function convertJulianToJulianDayImpl( year, month, day ) {
  const a = floor2( ( 14 - month ) / 12 );
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + floor2( ( 153 * m + 2 ) / 5 ) + 365 * y + floor2( y / 4 ) - 32083;
}

export function fillSelectWithMonthes( jSelect ) {
  for ( let i = 1; i <= 12; i++ ) {
    const option = $( document.createElement( 'option' ) );
    option.attr( 'value', i );
    option.text( mw.config.get( 'wgMonthNames' )[ i ] );
    jSelect.append( option );
  }
  jSelect.val( -1 );
}

function floor2( a ) {
  if ( a >= 0 ) {
    return Math.floor( a );
  } else {
    return Math.ceil( a );
  }
}

/** @returns {string} */
export function formatCentury( century ) {
  return formatDate( century * 100 );
}

/** @returns {string} */
export function formatDate( year, month, day ) {
  let time;
  if ( year >= 0 ) {
    time = '+' + year;
  } else {
    time = '-' + -year ;
  }
  time += '-';
  if ( typeof month !== 'undefined' ) {
    time += ( '00' + month ).substr( -2, 2 );
  } else {
    time += '01';
  }
  time += '-';
  if ( typeof day !== 'undefined' ) {
    time += ( '00' + day ).substr( -2, 2 );
  } else {
    time += '01';
  }
  time += 'T00:00:00Z';
  return time;
}

function isLeapGregorianYear( year ) {
  return year % 4 === 0 && !( year % 100 === 0 && year % 400 !== 0 ) ;
}

function _mod( a, b ) {
  return a - b * Math.floor( a / b ) ;
}

/**
 * Date.parse with progressive enhancement for ISO 8601
 * <https://github.com/csnover/js-iso8601> © 2011 Colin Snover
 * <http://zetafleet.com>
 *
 * Released under MIT license.
 *
 * Some changes by Vlsergey to adapt to Wikidata format
 */
export function parseISO8601( date ) {
  const numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];
  let timestamp, minutesOffset = 0;

  /* ES5 §15.9.4.2 states that the string should attempt to be parsed as a
   Date Time String Format string before falling back to any
   implementation-specific date parsing, so that’s what we do, even if
   native implementations could be faster */

  // 1 YYYY 2 MM 3 DD 4 HH 5 mm 6 ss 7 msec 8 Z 9 ± 10 tzHH 11 tzmm
  const struct = /^([+\-]\d{1,11})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec( date );
  if ( struct ) {
    // avoid NaN timestamps caused by “undefined” values being passed to
    // Date.UTC
    /* eslint no-cond-assign: 0 */
    for ( let i = 0, k; k = numericKeys[ i ] ; ++i ) {
      struct[ k ] = +struct[ k ] || 0;
    }

    // allow undefined days and months
    struct[ 2 ] = ( +struct[ 2 ] || 1 ) - 1;
    struct[ 3 ] = +struct[ 3 ] || 1;

    if ( struct[ 8 ] !== 'Z' && struct[ 9 ] !== undefined ) {
      minutesOffset = struct[ 10 ] * 60 + struct[ 11 ];

      if ( struct[ 9 ] === '+' ) {
        minutesOffset = 0 - minutesOffset;
      }
    }

    timestamp = Date.UTC( struct[ 1 ], struct[ 2 ], struct[ 3 ], struct[ 4 ], struct[ 5 ] + minutesOffset, struct[ 6 ], struct[ 7 ] );
  } else {
    timestamp = Date.parse( date );
  }

  return timestamp;
}
