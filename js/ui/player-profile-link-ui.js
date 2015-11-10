PlayerProfileLinkUI = {
  _format : function (n) {
    /* Consts */
    var precisions = [0, 0, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0];
    var divisions = [1, 1000, 1000000, 1000000000];
    var units = ['', 'K', 'M', 'B'];

    if(n === 0)
      return '0';

    var nlog = _.floor(Math.log10(n));
    var nlog3 = _.floor(nlog / 3);

    return _.floor(n / divisions[nlog3], precisions[nlog]) + units[nlog3];
  },

  _createTooltip : function (player) {
    var template_src = Util.requestWebAccessibleResourceSync('/templates/player-tooltip.jst').responseText;
    var compiled = _.template(template_src);

    return compiled(player);
  },

  apply : function (element, player) {
    // Trim Name
    element.text(element.text().trim());

    // Add Class
    element.addClass(CONST.UI.PLAYER_LINK_CLASS);

    // Add points
    element.after(" " + this._format(player.points));

    // Add tooltip
    element.append(this._createTooltip(player))
      .mousemove(function(e) {
        //find X & Y coodrinates
        var mouse_x = e.clientX;
        var mouse_y = e.clientY;
        var tooltip = $(this).find(".TWPI-Player-Tooltip");

        //Set tooltip position according to mouse position
        tooltip.css('top', (mouse_y + 20) + 'px');
        tooltip.css('left', (mouse_x + 20) + 'px');
      });




  }
};
