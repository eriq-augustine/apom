// Might get crafty with these functions later.
function isLeft(key) {
   return key === Crafty.keys.A || key === Crafty.keys.LEFT_ARROW;
}
function isRight(key) {
   return key === Crafty.keys.D || key === Crafty.keys.RIGHT_ARROW;
}
function isUp(key) {
   return key === Crafty.keys.W || key === Crafty.keys.UP_ARROW;
}
function isDown(key) {
   return key === Crafty.keys.S || key === Crafty.keys.DOWN_ARROW;
}
function leftIsDown() {
   return Crafty.keydown[Crafty.keys.A] || Crafty.keydown[Crafty.keys.LEFT_ARROW];
}
function rightIsDown() {
   return Crafty.keydown[Crafty.keys.D] || Crafty.keydown[Crafty.keys.RIGHT_ARROW];
}
function upIsDown() {
   return Crafty.keydown[Crafty.keys.W] || Crafty.keydown[Crafty.keys.UP_ARROW];
}
function downIsDown() {
   return Crafty.keydown[Crafty.keys.S] || Crafty.keydown[Crafty.keys.DOWN_ARROW];
}

function initPlayer() {
   Crafty.sprite(32, '/graphics/pica.png', {
      'pixel-pica': [0, 0],
      'leg-pica':   [1, 0],
      'hand-pica':  [2, 0]
   });

   Crafty.c('pica', {
         onVines: false,
         hasHands: false,

         init: function() {
            this.requires("Collision");

            this.onHit('vines', function() {
               this.onVines = true;
               this.stopFalling();
            },
            function() {
               this.onVines = false;
            });

            this.bind('EnterFrame', function() {
               if (this.hasHands && this.onVines) {
                  if (upIsDown() && !downIsDown())
                     this.y -= this._speed;
                  else if (downIsDown() && !upIsDown())
                     this.y += this._speed;
               }
            });

            // Don't run into solid things like doors
            this.bind('Moved', function(from) {
               if (this.hit('solid')) {
                  this.attr({'x': from.x, 'y': from.y});
               }
            });
         },
         setHands: function(val) {
            this.hasHands = val;
            return this;
         }
   });
}

function loadPica(type, x, y) {
   var pica = null;

   switch (type) {
      case 'pixel-pica':
         pica = loadPixelPica(x, y);
         break;
      case 'legs-pica':
         pica = loadLegsPica(x, y);
         break;
      case 'hands-pica':
         pica = loadHandsPica(x, y);
         break;
      default:
         console.log('Tried to load a non-existany pica type: ' + type + '.');
   }

   pica.addComponent('Gravity').gravity("Floor");

   return pica;
}

function loadPixelPica(x, y) {
   var height = 16;
   var width = 16;

   var jumpSpeed = 2;
   var runSpeed = 5;

   var pica = Crafty.e("2D, Canvas, pixel-pica").attr({'w': width, 'h': height, 'x': x, 'y': y});

   pica.addComponent("Twoway").twoway(runSpeed, jumpSpeed);

   pica.addComponent('SpriteAnimation').animate('pixel-blink', 0, 0, 3).animate('pixel-blink', 30, -1);

   return pica;
}

function loadLegsPica(x, y) {
   var jumpSpeed = 7;
   var runSpeed = 5;

   var pica = Crafty.e("2D, Canvas, pica, legs-pica")
         .attr({'w': 32, 'h': 32, 'x': x, 'y': y});

   pica.addComponent("Twoway").twoway(runSpeed, jumpSpeed);
   pica.addComponent('SpriteAnimation').animate('leg-run', 0, 1, 3).animate('leg-run', 30, -1);

   return pica;
}

// TODO(eriq): Real settings, just for testing now.
function loadHandsPica(x, y) {
   var jumpSpeed = 7;
   var runSpeed = 5;

   var pica = Crafty.e("2D, Canvas, pica, leg-pica")
         .attr({'w': 32, 'h': 32, 'x': x, 'y': y})
         .setHands(true);

   pica.addComponent("Twoway").twoway(runSpeed, jumpSpeed);
   pica.addComponent('SpriteAnimation').animate('hand-run', 0, 2, 3).animate('hand-run', 30, -1);

   return pica;
}
