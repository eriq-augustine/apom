function initRoamer() {
   Crafty.sprite(32, '/graphics/roamer.png', {
      'roamer1': [0, 0],
      'roamer2': [1, 0],
      'roamer3': [2, 0],
      'roamer4': [3, 0]
   });

   Crafty.c('roamer', {
      init: function() {
         this.requires("Collision");

         this.onHit('pica', function() {
            console.log(this);
         },
         function() {
            console.log('exit');
         });
      }
   });
}

// TODO(icco): Why not Crafty.addEntityFactory('Roamer', function() { ?
function newRoamer(x, y) {
   var height = 32;
   var width = 32;
   var animationName = 'roamer1';
   var animationRow = 0;

   var entity = Crafty.e('2D, Canvas, Collision, roamer')
         .attr({'w': height, 'h': width, 'x': x, 'y': y})
         .addComponent('SpriteAnimation')
            .animate(animationName, 0, animationRow, 3)
            .animate(animationName, 30, -1)
         .addComponent('Gravity').gravity("Floor");

    return entity;
}
