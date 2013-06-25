Goat-Reader
===========

This is an alternative to Google Reader.

#Requirement

* Server: [Node.js](http://nodejs.org/)
* Database: [MongoDB](http://www.mongodb.org/)


#Setup

## Ubuntu

install server and db.

```
apt-get install mongodb
apt-get install python-software-properties
add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install nodejs
npm install -g bower
```

clone code and setup.

```
git clone https://github.com/sys1yagi/Goat-Reader.git
cd Goat-Reader
npm install
bower install
```

run database.

```
mkdir db
mongod --dbpath db
```

run server.

```
./run_server.sh start
```

access to

```
http://localhost:3001/
```

## Usage : run_server.sh

### run_server.sh start

Start server using the "forever".

### run_server.sh stop uid

Stop server that matches a uid.

### run_server.sh restart uid

Restart server that matches a uid.

### run_server.sh list

Show server process uid..

ex)

```
info:    Forever processes running
data:        uid  command         script forever pid   logfile                            uptime        
data:    [0] ZekB /usr/bin/nodejs app.js 28062   28065 /home/yagi/.forever/ZekB.log       92:12:12:8.6  
data:    [1] ED6m /usr/bin/nodejs app.js 16696   16698 /home/yagi/.forever/stroke_log.txt 56:1:7:9.464  
data:    [2] YKhW /usr/bin/nodejs app.js 17689   17691 /home/yagi/.forever/goat_log.txt   0:0:55:16.245 
```


## settings.js

Following is default setting.

```
exports.local_port=3001;
exports.debug = false;
exports.auth = {
    twitter:{
        twitterConsumerKey:"set your twitter app consumer key."
        ,twitterConsumerSecret:"set your twitter app consumer secret."
        ,twitterAuthCallbackURL:"set your oauth callback url."
        ,callbackURL:"set your callback url."
    }
};
exports.cronTime = "*/30 * * * *";
```








