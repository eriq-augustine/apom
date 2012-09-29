var test_level = {
   "tile": {
      "width": "32",
      "height": "32"
   },
   "rows": "12",
   "cols": "16",
   "map": {
      "Platform": [
            {"row":"0", "col":"0"},
            {"row":"1", "col":"0"}
      ]
   }
}

LoadLevel = function(level) {
   for (var key in level.map) {
      var elements = level.map[key];
      for (var key in elements) {
         var val = elements[key];
         CreateGridPlatform(val.row, val.col, 1, 1);
      }
   }
};

LoadLevel(test_level);
