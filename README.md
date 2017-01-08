Intel® XDK IoT PawsIO Node.js\* Project
===========================================

<div align="center">
  <img src="https://s-media-cache-ak0.pinimg.com/564x/06/90/1d/06901d858bc68e61f0b23b123ee0db35.jpg">
</div>

See [LICENSE.md](LICENSE.md) for license terms and conditions.

This sample application is distributed as part of the
[Intel® XDK](http://xdk.intel.com). It can also be downloaded
or cloned directly from its git repo on the
[public Intel XDK GitHub\* site](https://github.com/gomobile).

For help getting started developing applications with the
Intel XDK, please start with
[the Intel XDK documentation](https://software.intel.com/en-us/xdk/docs).

Authors
-------
[Caitlin Araldi](https://github.com/caraldi),
[Chris Bruner](https://github.com/QuantumArchive),
[Nathan Hugon](https://github.com/nthugon),
[Michelle Srikhundonr](https://github.com/michellesri)

App Overview
------------
This repo contains all necessary files needed to utilize the [PawsIO](https://pawsio.herokuapp.com) app web app.
This project utilizes an Intel® Gallileo Board, Intel® Edison Development Platform, and a [Seeed Studio Grove Starter Kit](http://wiki.seeedstudio.com/wiki/Grove_Starter_Kit_Plus_-_IoT_Edition).
Your device must contain a compatible version of [Node.js](http://nodejs.org) and must be accessible to the Intel XDK via a network
connection.

Important Sample App Files
--------------------------
* main.js
* package.json

Important Sample Project Files
------------------------------
* README.md
* LICENSE.md
* project-name.xdk
* project-name.xdke

Tested IoT Node.js Platforms
----------------------------
* [Intel® Galileo Board](http://intel.com/galileo)
* [Intel® Edison Development Platform](http://intel.com/edison)
* [Intel® Joule™ 570x Developer Kit](http://intel.com/joule)

Getting Started
---------------
* This setup requires the following sensors available in the Seeed Studio Grove Starter Kit:
    * [Temperature](https://www.seeedstudio.com/Grove-Temperature-Sensor-p-774.html)
    * [LCD RGB Backlight](https://www.seeedstudio.com/Grove-LCD-RGB-Backlight-p-1643.html)
    * [Sound Sensor](https://www.seeedstudio.com/Grove-Sound-Sensor-p-752.html)
    * [Rotary Angle Sensor](https://www.seeedstudio.com/Grove-Rotary-Angle-Sensor%28P%29-p-1242.html)
    * [3-Axis Accelerometer](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer(%C2%B11.5g)-p-765.html)

* Hooking up your sensors to your Grove Shield interface:

<div align="center">
    <img src="http://wiki.seeedstudio.com/images/thumb/a/a6/Base_Shield_v2_-1.png/257px-Base_Shield_v2_-1.png">
</div>

* Hook the following Sensors to the given ports as marked in the below table

<center>

| Sensor               |      Port       |
| -------------------- | --------------- |
| Temperature Sensor   | A0              |
| Rotary Angle Sensor  | A1              |
| Sound Sensor         | A2              |
| 3-Axis Accelerometer | I2C0\*          |
| LCD RGB Backlight    | I2C3\*\*        |

</center>

<p> * far left I2C port </p>
<p> ** far right I2C port </p>

Running the Code
----------------
One you have all things connected, make sure to have your Intel® XDK IOT Edition properly installed and prepared
to upload code by following along with [this guide](https://software.intel.com/en-us/getting-started-with-xdk-and-iot) and 
[this guide](https://software.intel.com/en-us/blogs/2015/05/29/grove-starter-kit-with-intel-galileo-gen-2-getting-started-0).
Once the device has an wifi connection, we need to have two additional setup files.

Run the following command in your terminal:

```
$ npm run setup
```

This will create the two setup files were you must input your information needed to interact with [PawsIO](https://pawsio.herokuapp.com).
In the files, write the following code:

```javascript
// userinfo.js
module.exports = {
    username: 'insert username here',
    password: 'insert password here'
};
```

```javascript
// petinfo.js
module.exports = {
    name: 'insert pets name here',
    animal: 'insert type of animal here'
};
```
These files will be prevented from uploading to git via the .gitignore file. The userinfo contains your unique user info attached
to your [PawsIO](https://pawsio.herokuapp.com) account and the petinfo is related to the specific pet you currently are monitoring when running the device.

After files are created, upload them to your IOT device via the Intel® XDK. Use the rotary angle sensor and turn it completely clockwise to start recording.
To stop recording, turn the rotary sensory completely counter-clockwise and the data will be pushed to our database as soon as an internet connection is found.
Have fun and enjoy connecting more with your pet!

Issues
------
Please report any issues to our [Github!](https://github.com/pawsio/pawsio-iot/issues)
