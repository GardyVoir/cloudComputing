// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js";
import fetch from "node-fetch";
import formidable from 'formidable';

import express from 'express';
const app = express();

app.get("/", (req, res) => {
    getFiles(function (err, rows) {
        if (err) {
            req.flash('error', err)
            res.render('index', { data: '' })
        } else {
            res.render('index', { data: rows })
        }
    })
});

app.listen(3000, () => {
    console.log("server started on http://localhost:3000");
});

app.post("/fileupload", (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        const file = files.filetoupload;
        const params = {
            Bucket: "mds-cloudcomputing",
            Key: file.originalFilename,
            Body: file
        };
        try {
            const results = await s3Client.send(new PutObjectCommand(params));
            return results; // For unit tests.
        } catch (err) {
            console.log("Error", err);
        }
    })
})

const getFiles = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return [
        {
          "name": "blabla",
          "type": "jpg",          
        },
        {
          "name": "truc",
          "type": "txt",          
        }
    ]

    // const params = {
    //     Bucket: "mds-cloudcomputing"
    // };
    // try {
    //     const results = await s3Client.send(new ListObjectsCommand(params));
    //     return results;
    // } catch (err) {
    //     console.log("Error", err);
    // }
};
