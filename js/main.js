document.addEventListener('DOMContentLoaded', function () {
   Crafty.init(2000, 1000);
   Crafty.canvas.init();

   // The viewport is buggy using .follow(), there is code to take care of it in
   // pica's EnterFrame instead.
   Crafty.viewport.init(800, 480);

   // Global render method that everyone should use.
   // The choice is between 'Canvas' and 'DOM'. They are
   // suppose to look the same, but DOM is suppose to be a little faster.
   window.renderMethod = 'Canvas';

   document.getElementById('cjs_version').innerText = Crafty.getVersion();

   initEnv();
   initBaddies();
   initPlayer();

   //Crafty.scene("test_stage");
   Crafty.scene("stage_02");
});

Crafty.scene("test_stage", function() {
   //TEST
   loadLevel(window.level1);
   return;

   //loadPica('pixel-pica', 10, 10);
   //var pica = loadPica('legs-pica', 10, 100);
   var pica = loadPica('hands-pica', 10, 100);

   newRoamer(150, 10);
   newRoamer(350, 10);
   newRoamer(450, 10);
   newRoamer(650, 10);

   var floor = Crafty.e("2D, " + window.renderMethod + ", Color, Collision, Floor")
         .color("blue")
         .attr({h:30, w:1000, x:0, y:380});

   var door = Crafty.e("2D, " + window.renderMethod + ", Color, door, solid")
         .color("pink")
         .attr({h:100, w:20, x:200, y:280});

   Crafty.e('2D, ' + window.renderMethod + ', vines')
         .attr({h:300, w:50, x:400, y:80});

   Crafty.e('2D, ' + window.renderMethod + ', spikes, moving-spikes, trap')
         .attr({h:32, w:32, x:500, y:348});

   Crafty.e('2D, ' + window.renderMethod + ', saw, spinning-saw, trap')
         .attr({h:32, w:32, x:550, y:250});

   Crafty.e('2D, ' + window.renderMethod + ', cactus, punching-cactus, trap')
         .attr({h:32, w:32, x:600, y:348});

   // Add the switch
   loadDoorSwitch(pica, 100, 350, door);
});

Crafty.scene("loading", function() {
   Crafty.load(["/graphics/pica.png", "/graphics/env.png"], function() {
      Crafty.scene("main");
   });
});

Crafty.scene("stage_01",function() {
   startGoal = loadLevel(window.level1);
   var pica = loadPica('pixel-pica', startGoal.start.col, startGoal.start.row);
});

Crafty.scene("stage_02",function() {
   startGoal = loadLevel(window.level2);
   var pica = loadPica('legs-pica', startGoal.start.col, startGoal.start.row);
});

Crafty.scene("stage_03",function() {
   startGoal = loadLevel(window.level3);
   var pica = loadPica('head-pica', startGoal.start.col, startGoal.start.row);
});
