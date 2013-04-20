
which node_modules/.bin/jasmine-node > /dev/null 2>&1
if [ $? -ne 0 ] ; then
    echo "command not found: jasmine-node"
    echo "please install jasmine-node. e.g. npm install"
    exit
fi

node_modules/.bin/jasmine-node ./spec/*