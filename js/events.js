

chrome.runtime.onInstalled.addListener(function() {
  /*** Clear Storage ***/
  Storage.clear();

  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

    /*** Register the Page Action to run in the Tribal Wars webpage. ***/
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a '.tribalwars.com.br' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: '.tribalwars.com.br' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

/*** Register message listener ***/
// chrome.runtime.onMessage.addListener(
//   function(message, sender, sendResponse) {
//     console.info("[Background] Message Recived: %j from %s",
//       message, sender.tab.url);
//
//     sendResponse({m:'salame'});
//   }
// );
