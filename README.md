# buildlights-server

In our build envirnoment, we wanted to show the current build status of our pipeline on a hardware traffic build light. 

## Prerequisites

1. A hardware traffic build light from https://www.vanheusden.com/clewarecontrol/
2. The official clewarecontrol driver and tools from https://www.vanheusden.com/clewarecontrol/files
3. node-js and npm

## Usage

1. Checkout the repository
2. Install the clewarecontrol tools downloaded from above (and make sure 'clewarecontrol' is in the PATH)
2. Run start.sh. The server should startup on port 54321 by default

To set the lights, just open a browser and trigger the URL:

    http://localhost:54321/<trafficLightIdentifier>/<state>
    
<b>trafficLightIdentifier</b>: 
* one of 'qa' or 'dev'. Maps to the device id which can be retrieved by executing ```clewarecontrol -l```

<b>state</b>:
* 'off' = turns all lights off
* 'ok' = turns only the green light on
* 'nok' = turns only the red light on
* 'building' = turns the yellow light on (and keeps the other lights unchanged)
* 'warn' = turns all lights on

You can change the server port by providing a command line parameter to the start.sh script. e.g.

    > ./start.sh 8181
    
will start up the server on port 8181.


