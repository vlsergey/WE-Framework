var mw = {};

mw.config = new Map();
mw.config.set("wgContentLanguage", "en");
mw.config.set("wgUserLanguage", "en");

mw.log = () => console.log(...arguments);
mw.notify = function() { console.log(...arguments) };

var jQuery = () => ({
  button: () => ({}),
  dialog: () => ({}),
  tabs: () => ({}),
})

jQuery.uls = {
  data : {
    languages :{
      en: ["Latn",["EU","AM","AF","ME","AS","PA","WW"],"English"],
      ru: ["Cyrl",["EU","AS","ME"],"русский"],
    }
  }
};

window.jQuery = jQuery;
window.mw = mw;
