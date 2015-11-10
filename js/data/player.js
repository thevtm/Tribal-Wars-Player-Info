
Player = function (id, name, points, rank, tribe, villages) {
  /*** Properties ***/
  this.id = id;
  this.name = name;
  this.points = points;
  this.rank = rank;
  this.tribe = tribe;
  this.villages = villages;
  this.data_time = new Date();

  /*** Methods ***/


};


Player.fromJSON = function(json) {
  var player = new Player();

  for (var prop in json) {
    if (json.hasOwnProperty(prop)) {
      player[prop] = json[prop];
    }
  }

  if(player.tribe) // If tribe is not null (player is not a member of a tribe)
    player.tribe = Tribe.fromJSON(player.tribe);
  player.villages = _.map(player.villages, Player.fromJSON);

  return player;
};
