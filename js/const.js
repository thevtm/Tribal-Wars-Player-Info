CONST = {

  /*** Player Info ***/
  UserPlayerInfo : {
    PROFILE_URL : "/game.php?screen=info_player",
    GAME_DATA_SCRIPT_QUERY :"script:not([src])",
    IS_GAME_DATA_SCRIPT_RE : /var game_data/,
    PLAYER_INFO_RE : /player":{"id":"(\d+)","name":"(\w+)","ally":"(\d+)","sitter/
  },

  /*** Player Profile Page ***/
  PlayerProfile : {
    URL_JQ : "a[href*='info_player'][href*='id']:not([href*=add_friend])",
    MAIL_URL_JQ : "a[href*='mail'][href*='player']",
    ID_RE : /player=(\d+)/,
    NAME_JQ : "#player_info tr > th",
    TABLE_JQ : "#player_info tbody tr:not(:has(#minimap))",
    POINTS_INDEX: 1,
    POINTS_JQ : "td:last-child",
    RANKING_INDEX: 2,
    RANKING_JQ : "td:last-child",

    // Tribe
    TRIBE_JQ : "#player_info a:last",
    TRIBE_ID_RE : /id=(\d+)/,

    // Villages
    VILLAGES_TABLE_JQ : "#villages_list > tbody > tr",
    VILLAGE_A_JQ : "a:first",
    VILLAGE_ID_RE : /id=(\d+)/,
    VILLAGE_POS_JQ : "td:nth-child(2):not([style])",
    VILLAGE_POINTS_JQ : "td:last:not([style])"
  },

  /*** Date Refresh Rate ***/
  Refresh : {
    // Min 3 hours
    MIN : 3 * 60 * 60 * 1000,

    // Max 12 hours
    MAX: 12 * 60 * 60 * 1000
  },

  /*** User Interface ***/
  UI : {
    PLAYER_LINK_CLASS : "TWPI-Player-Link"
  }

};
