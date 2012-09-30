function initEnv() {
   Crafty.sprite(32, '/graphics/env.png', {'switch-off': [0, 0],
                                           'switch-on': [1, 0],
                                           'vines': [2, 0],
                                           'spikes': [0, 1],
                                           'saw': [0, 2],
                                           'cactus': [0, 3],
                                           'platform': [2, 3]});

   Crafty.c('moving-spikes', {
      init: function() {
         this.requires("SpriteAnimation");
         this.animate('spike-animation', 0, 1, 3);
         this.animate('spike-animation', 28, -1);
      }
   });

   Crafty.c('spinning-saw', {
      init: function() {
         this.requires("SpriteAnimation");
         this.animate('spike-animation', 0, 2, 3);
         this.animate('spike-animation', 5, -1);
      }
   });

   Crafty.c('punching-cactus', {
      init: function() {
         this.requires("SpriteAnimation");
         this.animate('spike-animation', 0, 3, 1);
         this.animate('spike-animation', 40, -1);
      }
   });

   // Anything that hurts you.
   // Pica will take care of the colision callback.
   Crafty.c('trap');
}

function loadDoorSwitch(pica, x, y, targetDoor) {
   Crafty.e("2D, " + window.renderMethod + ", switch-off").attr({'w': 16, 'h': 16, 'x': x, 'y': y});

   pica.addComponent("Collision").onHit("switch-off", function(hit) {
      // Replace the old switch
      hit[0].obj.destroy();
      Crafty.e("2D, " + window.renderMethod + ", switch-on").attr({'w': 16, 'h': 16, 'x': x, 'y': y});

      // Remove the door
      targetDoor.destroy();
   });
}
