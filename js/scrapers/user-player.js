/*
  Scrape User Player Info
*/

/**
 * Namespace for the User Player Scraper.
 * @namespace
 */
UserPlayerScraper = {


  scrape : function (content) {
    var UPI = CONST.UserPlayerInfo;

    var user_player_info_script = $(content)
      .find(UPI.GAME_DATA_SCRIPT_QUERY)
      .filter(function (index) {
        return UPI.IS_GAME_DATA_SCRIPT_RE.test($(this).html());
      })
      .first()
      .html();

    var user_player_info = UPI.PLAYER_INFO_RE.exec(user_player_info_script);

    return {
      id : parseInt(user_player_info[1]),
      name : user_player_info[2].trim(),
      tribe_id : parseInt(user_player_info[3])
    };
  }
};
