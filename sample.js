// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js";
import fetch from "node-fetch";

const sendCanard = async () => {
    const imageURL =
        "https://upload.wikimedia.org/wikipedia/commons/8/83/Canard_052006.JPG";
    const res = await fetch(imageURL);
    const blob = await res.buffer();
    const params = {
        Bucket: "mds-cloudcomputing", // The name of the bucket. For example, 'sample_bucket_101'.
        Key: "Canard.JPG", // The name of the object. For example, 'sample_upload.txt'.
        Body: blob, // The content of the object. For example, 'Hello world!".
    };
    try {
        const results = await s3Client.send(new PutObjectCommand(params));
        console.log(
            "Successfully created " +
            params.Key +
            " and uploaded it to " +
            params.Bucket +
            "/" +
            params.Key
        );
        return results; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};

const run = async () => {
    const params = {
        Bucket: "mds-cloudcomputing"
    };
    try {
        const results = await s3Client.send(new ListObjectsCommand(params));
        results.Contents.forEach(element => {
            console.log(element.Key);
        });
        return results; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};
run();
