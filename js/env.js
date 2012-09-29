Crafty.sprite(32, '/graphics/env.png', {'switch-off': [0, 0],
                                        'switch-on': [1, 0]});

window.switchIds = 0;

function loadDoorSwitch(pica, x, y, targetDoor) {
   var eventId = 'switch-event-' + switchIds++;

   Crafty.e("2D, Canvas, switch-off").attr({'w': 16, 'h': 16, 'x': x, 'y': y});

   pica.addComponent("Collision").onHit("switch-off", function(hit) {
      // Replace the old switch
      hit[0].obj.destroy();
      Crafty.e("2D, Canvas, switch-on").attr({'w': 16, 'h': 16, 'x': x, 'y': y});

      // Remove the door
      targetDoor.destroy();
   });
}
