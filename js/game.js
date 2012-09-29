var screen_width = 640;
var screen_height = 480;
Crafty.init(screen_width, screen_height);
Crafty.background('rgb(230, 230, 230)');

CreatePlatform = function(x, w, y, h) {
   Crafty.e("2D, Canvas, Color, Platform")
         .color("black")
         .attr({h:h, y:y, w:w, x:x});
};

//TODO: this really shouldn't be a separate function from above, but since
// I'm not very experienced with JS this is the best I came up with.
CreatePlatformLarge = function(x, w, y, h) {
   Crafty.e("2D, Canvas, Color, Platform, Large")
         .color("black")
         .attr({h:h, y:y, w:w, x:x});
};

CreateMiniatureLevel = function() {
   //Floor
   CreatePlatform(0, screen_width, screen_height - 80, 80);
   //Ceiling
   //TODO: lots of constants can be factored out of here
   CreatePlatform(-40, 720, -40, 40);

   //Left Platform
   CreatePlatform(50, 150, 270, 27);
   //Right Platform
   CreatePlatform(300, 200, 200, 27);

   //Left Wall
   CreatePlatform(-40, 40, 0, 480);
   //Right Wall
   CreatePlatform(screen_width, 40, 0, 480);
};

Scale = function(scale) {
   Crafty("Platform").each(function() {
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
ScaleLarge = function(scale) {
   Crafty("Large").each(function() {
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
      console.log("hello");
   });
};

// Large Level
CreateLargeLevel = function(scale) {
   CreatePlatformLarge(0, screen_width, screen_height - 80, 80);
   //Right Platform
   CreatePlatformLarge(300, 200, 200, 27);
   //Floor
   ScaleLarge(1.0/scale);
};

var scale = 0.05;
CreateMiniatureLevel();
CreateLargeLevel(scale);
Scale(scale);
