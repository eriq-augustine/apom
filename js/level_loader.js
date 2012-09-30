// This function assumes that there a brand new scene was just loaded.
function loadLevel(level) {
   var tileWidth = level.tile.width;
   var tileHeight = level.tile.height;
   var rows = level.rows;
   var cols = level.cols;

   var start = null;
   var goal = null;

   //TEST
   console.log("Loading level");

   for (var componentsKey in level.map) {
      var tiles = level.map[componentsKey];

      // Special for starts or goals.
      if (componentsKey.match(/start/)) {
         if (tiles.length > 1)
            console.log("WARNING: There are multiple starts in a map.");
         start = tiles[0];
         placeTile(tileWidth, tileHeight, start.row, start.col, componentsKey);
      } else if (componentsKey.match(/goal/)) {
         if (tiles.length > 1)
            console.log("WARNING: There are multiple goals in a map.");
         goal = tiles[0];
         placeTile(tileWidth, tileHeight, goal.row, goal.col, componentsKey);
      } else {
         tiles.forEach(function(tile) {
            placeTile(tileWidth, tileHeight, tile.row, tile.col, componentsKey);
         });
      }
   }

   return {'start': start, 'goal': goal};
}

function placeTile(width, height, row, col, components) {
   var componentStr = "2D, Sprite, " + window.renderMethod + ", " + components;

   //TEST
   //console.log("Creating: '" + componentStr + "' with: " + JSON.stringify({'h': height, 'w': width, 'x': col * width, 'y': row * height}));

   Crafty.e("2D, Sprite, " + window.renderMethod + ", " + components)
         .attr({'h': height, 'w': width, 'x': col * width, 'y': row * height});
}
