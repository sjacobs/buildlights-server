var express = require('express');
var execFile = require('child_process').execFile;

const PORT = process.argv[2] || 54321;
const CLEWARE_CONTROL = 'clewarecontrol';
const DEVICE_MAPPING = {
  'dev': '900221',
  'qa': '900220'
};

var app = express();

app.listen(PORT, function() {
  console.log("Server started on port %s", PORT);
});


const STATUS_MAPPING = {
  'off'       ['0', '0', '0'], 
  'ok':       ['0', '0', '1'],
  'building': ['*', '1', '*'],
  'warn':     ['1', '1', '1'],
  'nok':      ['1', '0', '0']
}

app.get('/:env/:state', function (req, res) {
  try {
    // state can be ok, building, warn or nok
    var state = req.params.state;
    // env can be dev or qa
    var env = req.params.env;
  
    var lightSettings = STATUS_MAPPING[state];
    lightSettings.forEach(function(setting, index) {
      var settingValue = parseSetting(setting);
      if (settingValue === 0 || settingValue === 1) {
        triggerBuildLight(DEVICE_MAPPING[env], index, settingValue);
      }
    });
    res.send("ok!");
  } catch(err) {
    res.send("error: " + err);
  }
});

function parseSetting(setting) {
  if (setting === '0' || setting === '1') {
    return parseInt(setting);
  }
  return undefined;
}

function triggerBuildLight(deviceNumber, lightnumber, onOrOff) {
  console.log('Setting %s, light number %s to %s', deviceNumber, lightnumber, onOrOff);
  execFile('sudo', [CLEWARE_CONTROL, '-c', '1', '-d', DEVICE_MAPPING[deviceNumber], '-as', lightnumber, onOrOff], function(error, stdout, stderr) { 
    console.log('Executing...');
    console.log(stderr);    
    console.log(stdout);
    if (error) {
      console.log(error);
    }
  });
    
}

