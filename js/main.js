document.addEventListener('DOMContentLoaded', function () {
   Crafty.init(800, 480);
   Crafty.canvas.init();

   initEnv();
   initBaddies();
   initPlayer();

   Crafty.scene("test_stage");
});

Crafty.scene("test_stage", function() {
   //loadPica('pixel-pica', 10, 10);
   //var pica = loadPica('legs-pica', 10, 100);
   var pica = loadPica('hands-pica', 10, 100);

   newRoamer(150, 10);
   newRoamer(350, 10);
   newRoamer(450, 10);
   newRoamer(650, 10);

   // Viewport is the camera, follow the player
   Crafty.viewport.follow(pica, 0, 0);

   var floor = Crafty.e("2D, Canvas, Color, Collision, Floor")
         .color("blue")
         .attr({h:30, w:1000, x:0, y:380 });

   var door = Crafty.e("2D, Canvas, Color, door, solid")
         .color("pink")
         .attr({h:100, w:20, x:200, y:280 });

   Crafty.e('2D, Canvas, vines')
         .attr({h:300, w:50, x:400, y:80 });

   Crafty.e('2D, Canvas, spikes, moving-spikes, trap')
         .attr({h:32, w:32, x:500, y:348 });

   // Add the switch
   loadDoorSwitch(pica, 100, 350, door);
});

Crafty.scene("loading", function() {
   Crafty.load(["/graphics/pica.png", "/graphics/env.png"], function() {
      Crafty.scene("main");
   });
});

Crafty.scene("stage_01",function() {
   var pica = loadPica('pixel-pica', 10, 10);
});
