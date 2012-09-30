tableElementOnClick = function(element) {
   element.innerHTML = document.getElementById("element_selector").value;
};

loadOnClick = function() {
   var level = JSON.parse('{"rows":12,"cols":16,"tile":{"width":32,"height":32},"map":{"Platform":[{"row":2,"col":5}],"Vine":[{"row":2,"col":6},{"row":3,"col":5},{"row":3,"col":6} ,{"row":3,"col":7},{"row":4,"col":6},{"row":4,"col":7}]}}');
   makeTable(level.rows, level.cols);
   for (var key in level.map) {
      var elements = level.map[key];
      for (var element in elements) {
      }
   }
}

saveOnClick = function() {
   var rows = 12;
   var cols = 16;
   var level = {};
   level.rows = rows;
   level.cols = cols;
   level.tile = {}
   level.tile.width = 32;
   level.tile.height = 32;
   level.map = {}
   level.map.Platform = [];
   level.map.Vine = [];
   var row;
   var cell;
   var grid = document.getElementById("grid_table");
   for (i = 0; row = grid.rows[i]; i++) {
      for (j = 0; cell = row.cells[j]; j++) {
         if (cell.innerHTML)
            level.map[cell.innerHTML].push({"row":i, "col":j});
      }
   }
   document.getElementById("map_dump").value = JSON.stringify(level);
};

makeTable = function(rows, cols) {
   var table_text = '<table id="grid_table"border=1>';
   for (row = 0; row < rows; row++) {
      table_text += "<tr>";
      for (col = 0; col < cols; col++) {
         table_text += '<td class="cell" onclick="tableElementOnClick(this)"></td>';
      }
      table_text += "</tr>";
   }
   table_text += "</table>";
   document.getElementById("grid").innerHTML = table_text;
}

makeTable(12, 16);
