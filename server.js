var http = require('http');
var dispatcher = require('httpdispatcher');
var execFile = require('child_process').execFile;

const PORT = process.argv[2] || 54321;
const CLEWARE_CONTROL = './clewarecontrol';
const DEVICE_MAPPING = {
  'dev': 'abcd',
  'qa': '3456'
};

dispatcher.setStatic('static');
dispatcher.setStaticDirname('static');

dispatcher.onGet('/dev/red', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(triggerBuildLights('dev', 0));
});

dispatcher.onGet('/dev/yellow', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(triggerBuildLights('dev', 1));
});

dispatcher.onGet('/dev/green', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(triggerBuildLights('dev', 2));
});


dispatcher.onGet('/qa/red', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(triggerBuildLights('qa', 0));
});

dispatcher.onGet('/qa/yellow', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(triggerBuildLights('qa', 1));
});

dispatcher.onGet('/qa/green', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(triggerBuildLights('qa', 2));
});


function triggerBuildLights(deviceNumber, value) {
  execFile(CLEWARE_CONTROL, ['-c', '1', '-d', DEVICE_MAPPING[deviceNumber]], function(error, stdout, stderr) { 
    console.log('Executing...');
    
    console.log(stdout);
    if (error) {
      console.log(error);
    }
  });
    
  return "ok! device " + deviceNumber + " set to " + value;
}






var server = http.createServer(function(req, res) {
  console.log("Request: %s", req.url);
  try {
    dispatcher.dispatch(req, res);
  } catch(err) {
    console.log(err);
  }
});

server.listen(PORT, function() {
  console.log("Server started on port %s", PORT);
});
