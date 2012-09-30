var test_level = {"rows":12,"cols":16,"tile":{"width":32,"height":32},"map":{"Platform":[{"row":2,"col":5}],"Vine":[{"row":2,"col":6},{"row":3,"col":5},{"row":3,"col":6},{"row":3,"col":7},{"row":4,"col":6},{"row":4,"col":7}]}};

function LoadLevel(level) {
   for (var key in level.map) {
      var elements = level.map[key];
      for (var key in elements) {
         var val = elements[key];
         CreateGridPlatform(val.row, val.col, 1, 1);
      }
   }
};

LoadLevel(test_level);
