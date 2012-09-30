function initBaddies() {
   Crafty.sprite(32, '/graphics/baddies.png', {
      'roamer': [0, 0]
   });

   // Pica will take care of the colision callback.
   Crafty.c('baddie');
}

// TODO(icco): Why not Crafty.addEntityFactory('Roamer', function() { ?
function newRoamer(x, y) {
   var height = 32;
   var width = 32;
   var animationName = 'roamer';
   var animationRow = 0;

   var entity = Crafty.e('2D, Canvas, Sprite, baddie, ' + animationName)
         .attr({'w': height, 'h': width, 'x': x, 'y': y})
         .addComponent('SpriteAnimation')
            .animate(animationName, 0, animationRow, 3)
            .animate(animationName, 30, -1)
         .addComponent("Collision")
         .addComponent('Gravity').gravity("Floor");

    return entity;
}
