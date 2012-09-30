//TODO(chebert): This all needs to be in a function.

function CreatePlatform(x, w, y, h, component) {
   component = component || "";
   var platform = Crafty.e("2D, Canvas, Color, Platform")
         .color("black")
         .attr({h:h, y:y, w:w, x:x});
   platform.addComponent(component);
   return platform;
};

var row_count = 16;
var col_count = 12;
var grid_width = 32;
var grid_height = 32;
function CreateGridPlatform(row, col, width, height, component) {
   var x = col * grid_width;
   var y = row * grid_height;
   var w = width * grid_width;
   var h = height * grid_height;
   return CreatePlatform(x, w, y, h, component);
};

function CreateFloor(component) {
   return CreateGridPlatform(row_count-2, 0, col_count, 2, component);
};

CreateMiniatureLevel = function() {
   var level = {
      "tile": {
         "width": "32",
         "height": "32"
      },
      "rows": "12",
      "cols": "16",
      "map": { }
   }
   for (i = 0; i < col_count; i++) {
      level.map.Platform.push({"row":row_count-2, "col":i});
   }
   //Ceiling
   CreateGridPlatform(-1, -1, col_count+2, 1);

   //Left Platform
   CreateGridPlatform(10, 1, 3, 1);
   //Right Platform
   CreateGridPlatform(7, 6, 4, 1);

   //Left Wall
   CreateGridPlatform(0, -1, 1, row_count);
   //Right Wall
   CreateGridPlatform(0, col_count, 1, row_count);
};

ScaleAnimate = function(scale, component) {
   Crafty(component).each(function() {
      var matrix = new Crafty.math.Matrix2D()
            .preScale(scale)
            .preTranslate(screen_width*(1-scale)/2.0,
                          screen_height*(1-scale)/2.0);

      var position = new Crafty.math.Vector2D(this.x, this.y);
      matrix.apply(position);
      var frames = 35;
      this.addComponent("Tween").tween({
         x:position.x,
         y:position.y,
         w:this.w*scale,
         h:this.h*scale
      }, frames);
   });
};

//TODO: again with the lack of JS experience making this a separate function
// from above.
ScaleOnce = function(scale, component) {
   Crafty(component).each(function() {
      var matrix = new Crafty.math.Matrix2D()
            .preScale(scale)
            .preTranslate(screen_width*(1-scale)/2.0,
                          screen_height*(1-scale)/2.0);
      var position = new Crafty.math.Vector2D(this.x, this.y);
      matrix.apply(position);
      this.x = position.x;
      this.y = position.y;
      this.w *= scale;
      this.h *= scale;
   });
};

// Large Level
CreateLargeLevel = function(scale) {
   CreateFloor("Large");
   //Right Platform
   CreateGridPlatform(6, 6, 4, 1, "Large");
   //Floor
   ScaleOnce(1.0/scale, "Large");
};

var scale = 0.05;
//CreateMiniatureLevel();
//CreateLargeLevel(scale);
//ScaleAnimate(scale, "Platform");
