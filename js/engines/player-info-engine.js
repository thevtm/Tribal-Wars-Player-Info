PlayerInfoEngine = {
  run : function () {
    var self = this;
    var players_cb = new Multimap();

    // If is in Player Profile Page mine and save player data.
    if(/info_player/.test(window.location.href)) {
      var p = PlayerProfileScraper.mine($(window.document), Global.User.id);
      Storage.setPlayer(p);
    }

    // Populate players_cb
    $(CONST.PlayerProfile.URL_JQ).each(function (index) {
      var link_jq = $(this);
      var player_name = link_jq.text().trim();
      var link = link_jq.attr('href');
      var callback = _.bind(PlayerProfileLinkUI.apply, PlayerProfileLinkUI, link_jq);

      players_cb.set(player_name, { link : link, callback : callback } );
    });

    // Get the data and call callbacks
    players_cb.forEachEntry(function (entry, key) {
      var link = _.first(entry).link;
      var callbacks = _.pluck(entry, 'callback');

      // Get Player from Storage
      Storage.getPlayer(key,
        function (player_storage) {
          // If not found in Storage
          if(player_storage === undefined) {
            self._scrapeSaveAndApplyCB(link, callbacks);
            return;
          }

          /* Found in Storage */
          // Refresh data if its too old
          var CR = CONST.Refresh;
          var data_life_time = new Date() - player_storage.data_time;

          if(data_life_time > _.random(CR.MIN, CR.MAX)) {
            // Data is old
            self._scrapeSaveAndApplyCB(link, callbacks);
          } else {
            // Data is good
            self._applyFnList(callbacks, player_storage);
          }
        }
      );
    });

  },

  _applyFnList : function(fns) {
    var args = Array.prototype.slice.call(arguments, 1);

    for(var i = 0; i < fns.length; i++) {
      fns[i].apply(null, args);
    }
  },

  _scrapeSaveAndApplyCB : function (link, callbacks) {
    var self = this;

    PlayerProfileScraper.scrape(link,
      function (player_scraped) {
        Storage.setPlayer(player_scraped);
        self._applyFnList(callbacks, player_scraped);
      }
    );
  }
};
