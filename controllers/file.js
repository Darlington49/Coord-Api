const File = require("../models/file");

var stream = require("stream");
var await = require("await");
const fs = require('fs')
// const db = require('../config/db.config.js');
// const File = db.files;

exports.uploadFile = (req, res) => {
  //console.log(req.body)
  File.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer,
    Version: req.body.Version,
    RepositoryURL: req.body.RepositoryURL,
    Actor: req.body.Actor,
  })
    .then((file) => {
      console.log(file);

      const result = {
        status: "ok",
        filename: req.file.originalname,
        message: "Upload Successfully!",
        Version: req.body.Version,
        RepositoryURL: req.body.RepositoryURL,
        Actor: req.body.Actor,
        downloadUrl: "http://localhost:3000/file/" + file.dataValues.id,
      };

      res.json(result);
    })
    .catch((err) => {
      console.log(err);

      const result = {
        status: "error",
        error: err,
      };
      res.json(result);
    });
};

exports.uploadMultipleFiles = async (req, res) => {
  const messages = [];

  for (const file of req.files) {
    const uploadfile = await File.create({
      type: file.mimetype,
      name: file.originalname,
      data: file.buffer,
    });

    // It will now wait for above Promise to be fulfilled and show the proper details
    console.log(uploadfile);

    if (!uploadfile) {
      const result = {
        status: "fail",
        filename: file.originalname,
        message: "Can NOT upload Successfully",
      };

      messages.push(result);
    } else {
      const result = {
        status: "ok",
        filename: file.originalname,
        message: "Upload Successfully!",
        downloadUrl:
          "http://localhost:8080/file/" + uploadfile.dataValues.id,
      };

      messages.push(result);
    }
  }

  return res.json(messages);
};

exports.listAllFiles = (req, res) => {
  File.findAll({ attributes: ["id", "name"] })
    .then((files) => {
      const fileInfo = [];

      console.log(files);

      for (let i = 0; i < files.length; i++) {
        fileInfo.push({
          filename: files[i].name,
          url: "http://localhost:3000/api/file/" + files[i].dataValues.id,
        });
      }

      res.json(fileInfo);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Error", detail: err });
    });
};

exports.downloadFile = (req, res) => {
  File.findByPk(req.params.id)
    .then((file) => {
      var fileContents = Buffer.from(file.data, "base64");
      var readStream = new stream.PassThrough();
      readStream.end(fileContents);

       res.set('Content-disposition', 'attachment; filename=' + file.name);
       	res.set('Content-Type', file.type);
      let result = fs.writeFileSync("upload//" + file.name, fileContents);
      console.log(result)
     // res.send("upload/" + file.name + " " + file.type);
      readStream.pipe(res);

    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Error", detail: err });
    });
};


//  curl -F 'file=@blink.bin' localhost:3000/file/upload
//curl -F 'file=@build/blink.bin' -F 'Version='"${GITHUB_SHA}"'' -F 'RepositoryURL= '"${GITHUB_REPOSITORY}"'' -F 'actor='"${GITHUB_ACTOR}"'' http://68.183.56.192:3000/file/upload 

