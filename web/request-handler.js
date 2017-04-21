var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

var content; 
var statusCode; 

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.handleRequest = function (request, response) {
  if (request.method === "GET") {

    if (request.url === '/') {

      fs.readFile('/Users/student/Desktop/hrsf76-web-historian/web/public/index.html', 'utf-8', function(err, html) {
        if (err) {
          throw err;
        }
        response.end(html);
      });
    } 

    fs.readFile(archive.paths.archivedSites + request.url, 'utf-8', function(err, data) {
      if (err) {
        response.writeHead(404);
        response.end(); 
      } else {
        response.end(data);
      }
    });
  }

  if (request.method === 'POST') {
    statusCode = 201; 

    var body = '';
    var myUrl = '';

    request.on('data', function(data) {
      body += data; 

      myUrl = body.split('=')[1];
    }); 

    request.on('end', function() {
      //var post = JSON.parse(body); 
      fs.appendFile(archive.paths.list, myUrl + '\n', function(err) {
        if (err) {
          console.log(err); 
        }
      response.writeHead(302, headers);
      response.end()
      });
    })
  }
}


