document.addEventListener('DOMContentLoaded', function () {
   Crafty.init(640,480);
   Crafty.canvas.init();


   //Crafty.scene("loading");
   Crafty.scene("test_stage");
});

Crafty.scene("test_stage", function() {
   //loadPica('pixel-pica', 10, 10);
   var pica = loadPica('leg-pica', 10, 100);
   var floor = Crafty.e("2D, Canvas, Color, Collision, Floor")
         .color("blue")
         .attr({h:30, w:400, x:0, y:380 });

   var door = Crafty.e("2D, Canvas, Color, door, solid")
         .color("pink")
         .attr({h:100, w:20, x:200, y:280 });

   // Add the switch
   loadDoorSwitch(pica, 100, 350, door);
});

Crafty.scene("loading", function() {
   Crafty.load(["/graphics/pica.png"], function() {
      Crafty.scene("main");
   });
});

Crafty.scene("stage_01",function() {
   var pica = loadPica('pixel-pica', 10, 10);
});
