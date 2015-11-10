Tribe = function (id, name) {
  // Properties
  this.id = id;
  this.name = name;

  // Methods

};


Tribe.fromJSON = function(json) {
  var tribe = new Tribe();

  for (var prop in json) {
    if (json.hasOwnProperty(prop)) {
      tribe[prop] = json[prop];
    }
  }

  return tribe;
};
