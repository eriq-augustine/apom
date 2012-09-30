function sizeTableOnClick() {
   rows = document.getElementById('numRows').value;
   cols = document.getElementById('numCols').value;

   if (window.tableRows == null) {
      window.tableRows = rows;
      window.tableCols = cols;
      makeTable(rows, cols, null);
      return;
   }

   var fillers = {};
   var row, cell;
   var grid = document.getElementById("grid_table");
   for (i = 0; row = grid.rows[i]; i++) {
      fillers[i] = {};
      for (j = 0; cell = row.cells[j]; j++) {
         if (cell.innerHTML)
            fillers[i][j] = cell.innerHTML;
         else
            fillers[i][j] = '';
      }
   }
   window.tableRows = rows;
   window.tableCols = cols;
   makeTable(rows, cols, fillers);
}

tableElementOnClick = function(element) {
   element.innerHTML = document.getElementById("element_selector").value;
}

loadOnClick = function() {
   var level = eval(document.getElementById("map_dump").value);
   makeTable(level.rows, level.cols, null);
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
}

makeTable = function(rows, cols, fillers) {
   var table_text = '<table id="grid_table"border=1>';
   for (row = 0; row < rows; row++) {
      table_text += "<tr>";
      for (col = 0; col < cols; col++) {
         var cellText = '';
         if (fillers && fillers[row] && fillers[row][col])
            cellText = fillers[row][col];

         table_text += '<td class="cell" onclick="tableElementOnClick(this)">' + cellText + '</td>';
      }
      table_text += "</tr>";
   }
   table_text += "</table>";
   document.getElementById("grid").innerHTML = table_text;
}

document.addEventListener('DOMContentLoaded', function() {
   window.tableRows = null;
   window.tableCols = null;
   sizeTableOnClick();
});
