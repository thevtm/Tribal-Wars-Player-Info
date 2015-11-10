Storage = {
  storage : chrome.storage.local,

  /**
    * Returns the location the player should be stored in the storage.
    * @param {string} player_name
    * @return {string}
    */
  playerPath : function (player_name) {
    return Global.world + ".Players." + player_name;
  },

  /**
    * Save Player in the storage.
    * @param {Player} player
    */
  setPlayer : function (player, callback) {
    // Change date format to JSON compatible
    player.data_time = player.data_time.toJSON();

    var path = this.playerPath(player.name);
    var save_obj = {};

    save_obj[path] = player;

    this.storage.set(save_obj, callback);
  },

  /**
    * Load Player from the storage.
    * @param {string} player_name
    * @param {function} callback
    * @async
    */
  getPlayer : function (player_name, callback) {
    var path = this.playerPath(player_name);

    this.storage.get(path, function (p) {

      // If not found in storage
      if(_.isEmpty(p)) {
        callback();
        return;
      }

      /* Found in Storage */
      // Unpack Player
      p = p[path];

      // Convert data_time from JSON compatible format to Date
      p.data_time = p ? new Date(p.data_time) : undefined;

      callback(p);
    });
  },

  /**
    * Clear Storage.
    */
  clear : function () {
    this.storage.clear();
  }
};
