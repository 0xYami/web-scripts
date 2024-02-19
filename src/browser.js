// https://github.com/0xyami/web-scripts/blob/main/src/browser.js \\

const getBrowserName =
    () => {
      const userAgent = navigator.userAgent;

      switch (true) {
        case /chrome/i.test(userAgent):
          return 'Google Chrome';
        case /firefox/i.test(userAgent):
          return 'Mozilla Firefox';
        case /safari/i.test(userAgent) && !/chrome/i.test(userAgent):
          return 'Apple Safari';
        case /edge/i.test(userAgent):
          return 'Microsoft Edge';
        case /opera/i.test(userAgent):
          return 'Opera';
        case /msie|trident/i.test(userAgent):
          return 'Internet Explorer';
        case /SamsungBrowser/i.test(userAgent):
          return 'Samsung Internet';
        case /ucbrowser/i.test(userAgent):
          return 'UC Browser';
        case /brave/i.test(userAgent):
          return 'Brave';
        case /vivaldi/i.test(userAgent):
          return 'Vivaldi';
        default:
          return 'Chromium';
      }
    }

let $browserName = getBrowserName();