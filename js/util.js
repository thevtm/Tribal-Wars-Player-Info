Util = {
  /**
    * @param {string} path Relative path to the extention install directory.
    * @return {XHR}
    */
  requestWebAccessibleResourceSync : function (path) {
    var request = new XMLHttpRequest();
    request.open('GET', chrome.extension.getURL(path), false);
    request.send(null);

    return request;
  }
};
