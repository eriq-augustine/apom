function LoadLevel(level) {
   for (var key in level.map) {
      var elements = level.map[key];
      for (var key in elements) {
         var val = elements[key];
         CreateGridPlatform(val.row, val.col, 1, 1);
      }
   }
};
