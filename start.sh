npm install
nohup node server.js $1 > ./server.log 2>&1 & echo $! > run.pid 
