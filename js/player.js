Crafty.sprite(32, '/graphics/pica.png', {'pixel-pica': [0, 0],
                                         'leg-pica': [1, 0]});

function loadPica(type, x, y) {
   var pica = null;

   switch (type) {
      case 'pixel-pica':
         pica = loadPixelPica(x, y);
         break;
      case 'leg-pica':
         pica = loadLegPica(x, y);
         break;
      default:
         console.log('Tried to load a non-existany pica type: ' + type + '.');
   }

   pica.addComponent('Gravity').gravity("Floor");
   pica.addComponent("Collision");

   return pica;
}

function loadPixelPica(x, y) {
   var height = 16;
   var width = 16;

   var pica = Crafty.e("2D, Canvas, pixel-pica").attr({'w': width, 'h': height, 'x': x, 'y': y});

   pica.addComponent("Twoway").twoway(5, 2)

   pica.addComponent('SpriteAnimation').animate('pixel-blink', 0, 0, 3).animate('pixel-blink', 30, -1);

   return pica;
}

function loadLegPica(x, y) {
   var pica = Crafty.e("2D, Canvas, leg-pica").attr({'w': 32, 'h': 32, 'x': x, 'y': y});

   pica.addComponent("Twoway").twoway(5, 5)

   pica.addComponent('SpriteAnimation').animate('leg-run', 0, 1, 3).animate('leg-run', 30, -1);

   return pica;
}
