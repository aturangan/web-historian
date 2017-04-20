var path = require('path');
var archive = require('../helpers/archive-helpers');
// var html = require('./index.html');
var fs = require('fs');
// require more modules/folders here!

var content; 
var statusCode; 


exports.handleRequest = function (request, response) {
  if (request.method === "GET") {
    statusCode = 200; 

    if (request.url === '/') {
      fs.readFile('/Users/student/Desktop/hrsf76-web-historian/web/public/index.html', 'utf-8', function(err, html) {
        
        if (err) {
          throw err;
        } 
        
        response.end(html);
      });



    // } else {
    //   statusCode = 404; 
    //   response.writeHead(statusCode);
    //   response.end(); 
    }

    //} else if () //check sites.txt if url exists already.
      //if website exists in the archive
      //return the content of the website/readFile


  }
};

// res.end(archive.paths.list);

// GET
//         1) should return the content of a website from the archive
//         2) Should 404 when asked for a nonexistent file
