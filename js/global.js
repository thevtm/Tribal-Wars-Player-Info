Global = {
  world : null,

  User : {
    id : null,
    name : null,
    tribe_id : null
  }
};

/*** Populate Global ***/

/**
  * Populate User information.
  */
Global.User.populate = function () {
  // Scrape player info
  var user_info = UserPlayerScraper.scrape(window.document);

  // Populate
  Global.User.id = user_info.id;
  Global.User.name = user_info.name;
  Global.User.tribe_id = user_info.tribe_id;
};


/**
  * Populate Global information.
  */
Global.populate = function () {
  // World
  var host = window.location.host;
  Global.world = host.slice(0, host.indexOf('.'));

  // User
  Global.User.populate();
};
