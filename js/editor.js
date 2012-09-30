tableElementOnClick = function(element) {
   element.innerHTML = document.getElementById("element_selector").value;
};

loadOnClick = function() {
   var level = eval(document.getElementById("map_dump").value);
   makeTable(level.rows, level.cols);
}

saveOnClick = function() {
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
