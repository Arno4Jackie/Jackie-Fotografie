/**
 * GET /admin
 * Admin Page.
 */
var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var http = require('http');
var querystring = require('querystring');
var request = require('request');
var Category = require('../models/category');
var util = require('util');
var _ = require('underscore');
var photoCollection = require('../models/photoCollection');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';
var categoryList;

exports.index = (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }

    Category.find().exec(function(err, doc) {
        if (err) throw err;
        categoryList = doc;
        // console.log(categoryList);

        res.render('UploadImage', {
            title: 'Upload new image',
            categoryList: categoryList,
            imgUrl: 'background/' + getMostRecentFileName()
        });
    });
}

function getMostRecentFileName() {
    var dir = 'public/background';
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, function(f) {
        var fullpath = path.join(dir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).ctime;
    });
}

exports.NewUpload = (req, res, next) => {

    var folderID = '0BydPt840pObUT2p5blJKTmI2OXc';
    var CategoryID = '';
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../uploads');
    var ImageFile;
    var fieldData;
    var IsNewMainImage = 0;
    var RealFileData;

    form.on('file', function(name, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        RealFileData = file;
    });

    form.parse(req, function(err, fields, files) {
        CategoryID = fields.CategoryID;

        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received upload:\n\n');
        CategoryID = fields.CategoryID;
        IsNewMainImage = fields.IsNewMainImage;
        if (IsNewMainImage == 'true') {
            console.log('resetting Main Image in db.');
            ResetMainImage();
        }
        var counter = 0;
        insertFile(RealFileData, CategoryID, IsNewMainImage);

        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        form.on('end', function() {
            res.end('success');
        });

        form.parse(req);
        return 'Success';
    })

}

function insertFile(fileData, CategoryID, IsNewMainImage) {
    console.log('insertFile');
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    var filePath = path.join(path.join(__dirname, '../uploads'), fileData.name);

    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }

        authorize(JSON.parse(content), fileData, CategoryID, IsNewMainImage);
    });
};

function sendToDrive(auth, fileData, CategoryID, IsNewMainImage) {
    console.log('sendToDrive');
    var contentType = fileData.type || 'application/octet-stream';
    var metadata = {
        'name': fileData.name,
        'mimeType': contentType,
        'parents': ["0BydPt840pObUT2p5blJKTmI2OXc"]
    };
    var filePath = path.join(path.join(__dirname, '../uploads'), fileData.name);

    var service = google.drive({
        'version': 'v3',
        auth: auth
    });

    service.files.create({
        resource: metadata,
        media: {
            mimeType: contentType,
            body: fs.createReadStream(filePath)
        }
    }, function(err, file) {
        if (err) {
            console.log(err);
            return;
        } else {
            // console.log('File Id: ', file.id);
            WriteToDb(file.id, fileData, CategoryID, IsNewMainImage);
            DeleteFile(filePath);
        }
    });
}

function WriteToDb(id, fileData, CategoryID, IsNewMainImage) {
    var photo = new photoCollection({
        imgName: fileData.name,
        url: 'https://docs.google.com/uc?id=' + id + '&amp;export=download',
        isMainImage: IsNewMainImage,
        category: CategoryID
    });

    photo.save(function(err) {
        if (err) {
            return err;
        } else {
            console.log('Post saved');
        }
    });
}

function ResetMainImage() {
    photoCollection.findOneAndUpdate({
        isMainImage: true
    }, {
        $set: {
            isMainImage: false
        }
    }, function(err, doc) {
        if (err) console.log('error: ' + err);
        console.log("update complete");
    });
}

function DeleteFile(path) {
    fs.unlink(path);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, fileData, CategoryID, IsNewMainImage) {
    var clientSecret = credentials.web.client_secret;
    var clientId = credentials.web.client_id;
    console.log(credentials.web);
    var redirectUrl = credentials.web.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            sendToDrive(oauth2Client, fileData, CategoryID, IsNewMainImage);
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}