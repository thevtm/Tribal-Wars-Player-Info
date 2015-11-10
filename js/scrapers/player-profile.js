/*
  Scrape Player Profile Page
*/
/**
 * Namespace for the Player Profile Scraper.
 * @namespace
 */
PlayerProfileScraper = {

  /**
   * Mine Tribe data found in the *content* parameter.
   * @param {jQuery} content A jQuery object containing the tribe information.
   * @return {Tribe}
   */
  mineTribe : function (content) {
    // Query Tribe Link
    var tribe_a = content.find(CONST.PlayerProfile.TRIBE_JQ);
    if(tribe_a.length === 0)
      return null;

    // Mine Tribe ID/Name
    var tribe_id = parseInt(_.last(CONST.PlayerProfile.TRIBE_ID_RE.exec(tribe_a.attr('href'))));
    var tribe_name = tribe_a.text().trim();

    // console.info("PlayerProfile Mined Tribe: [%d] %s", tribe_id, tribe_name);

    return new Tribe(tribe_id, tribe_name);
  },

  /**
   * Mine Villages data found in the *content* parameter.
   * @param {jQuery} content A jQuery object containing the tribe information.
   * @return {[Village]}
   */
  mineVillages: function (content) {
    return _.map(content.find(CONST.PlayerProfile.VILLAGES_TABLE_JQ),
      function (v) {
        var village = $(v);

        var village_a = village.find(CONST.PlayerProfile.VILLAGE_A_JQ);
        var village_name = village_a.text().trim();
        var village_id = parseInt(_.last(CONST.PlayerProfile.VILLAGE_ID_RE.exec(village_a.attr('href'))));
        var village_points = parseInt(village.find(CONST.PlayerProfile.VILLAGE_POINTS_JQ).text().replace('.', '').trim());

        var village_pos = _.map(village.find(CONST.PlayerProfile.VILLAGE_POS_JQ).text().split("|"), _.partial(parseInt, _, 10));
        village_pos = {x:village_pos[0], y:village_pos[1]};

        // console.info("PlayerProfile Mined Village: [%d] %s %dPts Pos(%d|%d)",
        //   village_id, village_name, village_points, village_pos.x, village_pos.y);

        return new Village(village_id, village_name, village_pos, village_points);
      }
    );
  },

  /**
   * Mine Player data found in the *content* parameter.
   * @param {jQuery} content A jQuery object containing the tribe information.
   * @param {Number} fallback_id Fallback to this ID if unable to find one.
   * Useful when scraping User own Player Profile.
   * @return {Player}
   */
  mine: function (content, fallback_id) {
    var PP = CONST.PlayerProfile;
    var name = content.find(PP.NAME_JQ).text().trim();

    // Points/Rank from table
    var table = content.find(PP.TABLE_JQ);
    var points = parseInt($(table[PP.POINTS_INDEX]).find(PP.POINTS_JQ).text().replace('.', ''));
    var ranking = parseInt($(table[PP.RANKING_INDEX]).find(PP.RANKING_JQ).text().trim());

    // ID
    var mailURL = content.find(PP.MAIL_URL_JQ).first().attr('href');
    var id = parseInt(_.last(PP.ID_RE.exec(mailURL))) || fallback_id;

    // Tribe
    var tribe = this.mineTribe(content);

    // Villages
    var villages = this.mineVillages(content);

    // console.info('PlayerProfile Mined Player: [%d] %s %dPts Rank %d',
    //   id, name, points, ranking);

    return new Player(id, name, points, ranking, tribe, villages);
  },

  /**
    * Scrape Player Profile.
    * @param {string} url URL that of the Player Profile.
    * @return {jqXHR}
    * @async
    */
  scrape: function (url, callback, fallback_id) {
    var self = this;
    return $.get(url, function (data) {
      callback(self.mine($(data, fallback_id)));
    });
  }

};
