// HomeKit types required
var types = require("./types.js")
var exports = module.exports = {};
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://iot.eclipse.org');


var execute = function (accessory, characteristic, value) {

    client.on('connect', function () {
        console.log("CONNECTED");

    });
    console.log("executed accessory: " + accessory + ", and characteristic: " + characteristic + ", with value: " + value + ".");
}

exports.accessory = {
    displayName: "Light 1",
    username: "1A:2B:3C:4D:5E:FF",
    pincode: "031-45-154",
    services: [{
        sType: types.ACCESSORY_INFORMATION_STYPE,
        characteristics: [{
            cType: types.NAME_CTYPE,
            onUpdate: null,
            perms: ["pr"],
            format: "string",
            initialValue: "Light 1",
            supportEvents: false,
            supportBonjour: false,
            manfDescription: "Bla",
            designedMaxLength: 255
        }, {
            cType: types.MANUFACTURER_CTYPE,
            onUpdate: null,
            perms: ["pr"],
            format: "string",
            initialValue: "Oltica",
            supportEvents: false,
            supportBonjour: false,
            manfDescription: "Bla",
            designedMaxLength: 255
        }, {
            cType: types.MODEL_CTYPE,
            onUpdate: null,
            perms: ["pr"],
            format: "string",
            initialValue: "Rev-1",
            supportEvents: false,
            supportBonjour: false,
            manfDescription: "Bla",
            designedMaxLength: 255
        }, {
            cType: types.SERIAL_NUMBER_CTYPE,
            onUpdate: null,
            perms: ["pr"],
            format: "string",
            initialValue: "A1S2NASF88EW",
            supportEvents: false,
            supportBonjour: false,
            manfDescription: "Bla",
            designedMaxLength: 255
        }, {
            cType: types.IDENTIFY_CTYPE,
            onUpdate: null,
            perms: ["pw"],
            format: "bool",
            initialValue: false,
            supportEvents: false,
            supportBonjour: false,
            manfDescription: "Identify Accessory",
            designedMaxLength: 1
        }]
    }, {
        sType: types.LIGHTBULB_STYPE,
        characteristics: [{
            cType: types.NAME_CTYPE,
            onUpdate: null,
            perms: ["pr"],
            format: "string",
            initialValue: "Light 1 Light Service",
            supportEvents: false,
            supportBonjour: false,
            manfDescription: "Bla",
            designedMaxLength: 255
        }, {
            cType: types.POWER_STATE_CTYPE,
            onUpdate: function (value) {
                console.log(value);
                if (value == true) {
                    client.publish('esp8266/18:fe:34:fe:81:e9/command', '1', {retain: true});
                    client.publish('esp8266/18:fe:34:fe:81:d3/command', '1', {retain: true});
                    client.publish('esp8266/18:fe:34:fe:c0:ff/command', '1', {retain: true});
                    client.publish('esp8266/18:fe:34:fe:ab:8b/command', 'a', {retain: true});
                }
                else {
                    client.publish('esp8266/18:fe:34:fe:81:e9/command', '0', {retain: true});
                    client.publish('esp8266/18:fe:34:fe:81:d3/command', '0', {retain: true});
                    client.publish('esp8266/18:fe:34:fe:c0:ff/command', '0', {retain: true});
                    client.publish('esp8266/18:fe:34:fe:ab:8b/command', 'b', {retain: true});
                }
            },
            perms: ["pw", "pr", "ev"],
            format: "bool",
            initialValue: false,
            supportEvents: false,
            supportBonjour: false,
            manfDescription: "Turn On the Light",
            designedMaxLength: 1
        }, {
            cType: types.HUE_CTYPE,
            onUpdate: function (value) {
                console.log("Change:", value);
                execute("Test Accessory 1", "Light - Hue", value);
            },
            perms: ["pw", "pr", "ev"],
            format: "int",
            initialValue: 0,
            supportEvents: false,
            supportBonjour: false,
            manfDescription: "Adjust Hue of Light",
            designedMinValue: 0,
            designedMaxValue: 360,
            designedMinStep: 1,
            unit: "arcdegrees"
        }, {
            cType: types.BRIGHTNESS_CTYPE,
            onUpdate: function (value) {
                console.log("Change:", value);
                execute("Test Accessory 1", "Light - Brightness", value);
            },
            perms: ["pw", "pr", "ev"],
            format: "int",
            initialValue: 0,
            supportEvents: false,
            supportBonjour: false,
            manfDescription: "Adjust Brightness of Light",
            designedMinValue: 0,
            designedMaxValue: 100,
            designedMinStep: 1,
            unit: "%"
        }, {
            cType: types.SATURATION_CTYPE,
            onUpdate: function (value) {
                console.log("Change:", value);
                execute("Test Accessory 1", "Light - Saturation", value);
            },
            perms: ["pw", "pr", "ev"],
            format: "int",
            initialValue: 0,
            supportEvents: false,
            supportBonjour: false,
            manfDescription: "Adjust Saturation of Light",
            designedMinValue: 0,
            designedMaxValue: 100,
            designedMinStep: 1,
            unit: "%"
        }]
    }]
}