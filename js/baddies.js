function initBaddies() {
   Crafty.sprite(32, '/graphics/baddies.png', {
      'roamer': [0, 0]
   });

   // Pica will take care of the colision callback.
   Crafty.c('baddie');

   // Makes an entity roam a small area.
   Crafty.c('patrol', {
      init: function() {
         this.timeout(this.tick, 2000);
      },
      tick: function() {
         this.move('w', 10);
         this.timeout(this.tick, 2500*Math.random());
      }
   });
}

function newRoamer(x, y) {
   var height = 32;
   var width = 32;
   var animationName = 'roamer';
   var animationRow = 0;

   var entity = Crafty.e('2D, ' + window.renderMethod + ', Sprite, patrol, baddie, ' + animationName)
         .attr({'w': height, 'h': width, 'x': x, 'y': y})
         .addComponent('SpriteAnimation')
            .animate(animationName, 0, animationRow, 3)
            .animate(animationName, 30, -1)
         .addComponent("Collision")
         .addComponent('Gravity').gravity("Floor");

    return entity;
}
