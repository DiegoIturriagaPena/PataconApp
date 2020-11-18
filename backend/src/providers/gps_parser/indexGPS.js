var gps = require("gps-tracking");
var gpsOptions = {
    'debug': true,
    'port': '13000',
    'device_adapter': require('./adapter-tk103'),
    'host': '0.0.0.0'
}

// Global var that contain the route and info of gps
GPS_DATA = {};
const connectionStableshed = {};

var server = gps.server(gpsOptions, function (device, connection) {
    device.on("login_request", function (device_id, msg_parts) {
        this.login_authorized(true);
        device.emit("login");
    });

    device.on("login", function () {
        connectionStableshed[device.uid] = connection;
        console.log("Hi! i'm " + device.uid);
        device.send(`**,imei:${device.uid},C,10s`);
        device.send(`**,imei:${device.uid},I,-4`);
    });

    //PING -> When the gps sends their position
    device.on("ping", function (gpsData) {

        //After the ping is received, but before the data is saved
        console.log('data');
        console.log(gpsData);

        if (gpsData.signal === 'F') {
            GPS_DATA[device.uid] = {
                latitude: gpsData.latitude,
                longitude: gpsData.longitude,
                velocity: gpsData.velocity,
                date: gpsData.date
            };
            GPS_DATA['124'] = {
                latitude: gpsData.latitude,
                longitude: gpsData.longitude,
                velocity: gpsData.velocity,
                date: gpsData.date
            };
        }
    });

    connection.on('close', (hadError) => {
        console.log(`connection \with device ${device.uid} is close`);
        delete connectionStableshed[device.uid];
    });

    connection.on('error', (err) => {
        console.log("Ocurrio un error en la funcion connection.close");
        console.log(err);
        connection.emit('close', true);
    });
});
