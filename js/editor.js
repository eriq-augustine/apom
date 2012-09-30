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

function setTableCell(row, col, innerHTML) {
   var grid_row, cell;
   var grid = document.getElementById("grid_table");
   for (i = 0; grid_row = grid.rows[i]; i++) {
      if (i == row) {
         console.log(i);
         for (j = 0; cell = grid_row.cells[j]; j++) {
            if (j == col) {
               cell.innerHTML = innerHTML;
            }
         }
      }
   }
}

loadOnClick = function() {
   var level = JSON.parse(document.getElementById("map_dump").value);
   makeTable(level.rows, level.cols);
   for (var key in level.map) {
      var map_type = level.map[key];
      for (ndx in map_type) {
         setTableCell(map_type[ndx].row, map_type[ndx].col, key);
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
   var row;
   var cell;
   var grid = document.getElementById("grid_table");
   for (i = 0; row = grid.rows[i]; i++) {
      for (j = 0; cell = row.cells[j]; j++) {
         if (cell.innerHTML != '') {
            if (!level.map[cell.innerHTML])
               level.map[cell.innerHTML] = [];
            level.map[cell.innerHTML].push({"row":i, "col":j});
         }
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
