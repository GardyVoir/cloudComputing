import { PutObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js";
import formidable from "formidable";

import express from "express";
import { readFileSync } from "fs"
const app = express();
const bucket = "mds-course-bucket";
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("server started on http://localhost:3000");
});

app.get("/", (req, res) => {
  Promise.all([getFiles()])
    .then((rows) => {
      res.render("index", { data: rows[0] });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post("/fileupload", (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      const file = readFileSync(files.filetoupload.filepath);
      const params = {
        Bucket: bucket,
        Key: files.filetoupload.originalFilename,
        Body: file,
      };
      await s3Client.send(new PutObjectCommand(params));
      res.redirect("/");
      res.end();
    });
  } catch (err) {
    console.log("Error", err);    
    res.redirect("/");
    res.end();
  }
});

app.get("/file/:id", (req, res) => {
    res.send("Id is set to " + req.params.id);
  });

const getFiles = async () => {
  const params = {
    Bucket: bucket,
  };
  try {
    const results = await s3Client.send(new ListObjectsCommand(params));
    return results.Contents;
  } catch (err) {
    console.log("Error", err);
  }
};
