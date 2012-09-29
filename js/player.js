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
   Crafty.sprite(32, '/graphics/pica.png', {'pixel-pica': [0, 0],
                                            'legs-pica': [1, 0],
                                            'head-pica': [2, 0],
                                            'hands-pica': [3, 0]});

   Crafty.c('pica', {
         onVines: false,
         hasHands: false,
         hasHead: false,

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
         hands: function() {
            this.hasHands = true;
            return this;
         },
         head: function() {
            this.hasHead = true;
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
      case 'head-pica':
         pica = loadHeadPica(x, y);
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
   return loadBasePica(16, 16, x, y, 2, 3, 'pixel-pica', 'pixel-bling', 0)
}

function loadLegsPica(x, y) {
   return loadBasePica(32, 32, x, y, 5, 5, 'legs-pica', 'leg-run', 1)
}

function loadHeadPica(x, y) {
   var pica = loadBasePica(32, 32, x, y, 5, 5, 'head-pica', 'head-run', 2)
         .head();

   return pica;
}

function loadHandsPica(x, y) {
   var pica = loadBasePica(32, 32, x, y, 5, 5, 'hands-pica', 'hand-run', 3)
         .head()
         .hands();

   return pica;
}

function loadBasePica(height, width, x, y, jumpSpeed, runSpeed, picaType, animationName, animationRow) {
   var pica = Crafty.e("2D, Canvas, pica, " + picaType)
         .attr({'w': height, 'h': width, 'x': x, 'y': y})
         .addComponent("Twoway")
         .twoway(runSpeed, jumpSpeed)
         .addComponent('SpriteAnimation')
         .animate(animationName, 0, animationRow, 3)
         .animate(animationName, 30, -1);

   return pica;
}
