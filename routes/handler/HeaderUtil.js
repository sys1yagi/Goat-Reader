exports.writeHeadJson = function (res) {
    res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
}

exports.writeHeadHTML = function(res){
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
}



