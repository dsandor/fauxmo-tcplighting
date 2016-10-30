'use strict';

const Tcp = require('connectedbytcp'),
      FauxMo = require('fauxmojs');

let tcp = new Tcp('192.168.1.185'); // This is the IP of the TCP Connect hub.

tcp.Init((err) => {
  tcp.GetState((err, rooms) => {
    console.log('rooms:', rooms, 'err:', err);
  })
});

let options = {
  devices: [
    {
      name: 'hall light',
      port: 11000,
      handler: (action) => {
        console.log('hall light action:', action);
        if (action === 'on') {
          tcp.TurnOnRoom(7, (err, result) => {
            console.log('turned on hall');
          });
        } else {
          tcp.TurnOffRoom(7, (err, result) => {
            console.log('turned on hall');
          });
        }
      }
    }
  ]
};

let fauxmo = new FauxMo(options);
console.log('fauxmo started');