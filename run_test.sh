
which node_modules/.bin/mocha > /dev/null 2>&1
if [ $? -ne 0 ] ; then
    echo "command not found: mocha"
    echo "please install mocha. e.g. npm install"
    exit
fi

node_modules/.bin/mocha -t 1500000 ./spec/*/*
