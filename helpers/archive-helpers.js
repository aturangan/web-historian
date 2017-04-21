var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// var arrayOfUrls = [];
// '/Users/student/Desktop/hrsf76-web-historian/archives/sites.txt'
exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log(err); 
    }
    callback(data.split('\n')); 
  });
  //read through archived sites 
  //exports.paths.readFile?
  // console.log('ARCHIVED', archivedSites); 
  // done(); 
};

exports.isUrlInList = function(url, callback) {
  //readList
  exports.readListOfUrls(function(data) {
    if (data.includes(url)) {
      callback(true);
    } else {
      callback(false);
    }
  });
    //isUrlInList 
  // list: path.join(__dirname, '../archives/sites.txt')
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(exports.paths.list, url, function(err) {
    if (err) {
      console.log(err); 
    }
    callback();
  });

  // fs.writeFile(exports.paths.archivedSites + '/' + url, '', function(err) { 
  //   if (err) {
  //    console.log(err);
  //   }
  // });
}

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
      if (files.includes(url)) {  
        callback(true);
      } else {
        callback(false);
      }
  });
};


exports.downloadUrls = function(urls) { //urls = array
  _.each(urls, function (url) {
    if (!url) { return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
};
