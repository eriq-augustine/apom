function initBaddies() {
   Crafty.sprite(32, '/graphics/baddies.png', {
      'roamer1': [0, 0]
   });

   Crafty.c('roamer');
}

// TODO(icco): Why not Crafty.addEntityFactory('Roamer', function() { ?
function newRoamer(x, y) {
   var height = 32;
   var width = 32;
   var animationName = 'roamer1';
   var animationRow = 0;

   var entity = Crafty.e('2D, Canvas, Sprite, Collision, roamer, ' + animationName)
         .attr({'w': height, 'h': width, 'x': x, 'y': y})
         .addComponent('SpriteAnimation')
            .animate(animationName, 0, animationRow, 3)
            .animate(animationName, 30, -1)
         .addComponent('Gravity').gravity("Floor");

    return entity;
}
