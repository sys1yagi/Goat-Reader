#!/bin/sh
which node > /dev/null 2>&1
if [ $? -ne 0 ] ; then
    echo "command not found: node"
    echo "please install node. e.g. sudo port install nodejs"
    exit
fi

which npm > /dev/null 2>&1
if [ $? -ne 0 ] ; then
    echo "command not found: npm"
	echo "please install npm. e.g. sudo port install npm"
	exit
fi

which bower > /dev/null 2>&1
if [ $? -ne 0 ] ; then
    echo "command not found: npm"
	echo "please install bower. e.g. sudo npm -g install bower"
	exit
fi

npm install
cd public
bower install
cd ../

