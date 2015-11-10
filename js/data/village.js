Village = function (id, name, pos, points) {
  // Properties
  this.id = id;
  this.name = name;
  this.pos = pos;
  this.points = points;


  // Methods


}


Village.fromJSON = function(json) {
  var village = new Village();

  for (var prop in json) {
    if (json.hasOwnProperty(prop)) {
      village[prop] = json[prop];
    }
  }

  return village;
}
