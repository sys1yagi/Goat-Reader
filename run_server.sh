#!/bin/sh
ISERROR=0

which node > /dev/null 2>&1
if [ $? -ne 0 ] ; then
  echo "command not found: node"
	echo "please install node. e.g. sudo port install nodejs"
	ISERROR=1
fi

which ./node_modules/forever/bin/forever > /dev/null 2>&1
if [ $? -ne 0 ] ; then
  echo "command not found: forever"
	echo "please exec command. 'npm install'"
	ISERROR=1
fi

if [ $ISERROR == 1 ] ; then
	exit
fi

if [ "$1" == "start" ] ; then
    echo "server start"
    ./node_modules/forever/bin/forever start app.js
elif [ "$1" == "restart" ] ; then
    ./node_modules/forever/bin/forever stopall
    ./node_modules/forever/bin/forever start app.js
elif [ "$1" == "stop" ] ; then
    ./node_modules/forever/bin/forever stopall
fi