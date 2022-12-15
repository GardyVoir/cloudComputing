import { S3Client } from "@aws-sdk/client-s3";
//import credentials from "./.aws/credentials.json" assert {type: 'json'};
const credentials = {
    accessKeyId : process.env.accessKeyId,
    secretAccessKey : process.env.secretAccessKey
}
const REGION = "eu-west-3";
const s3Client = new S3Client({ region: REGION, credentials: credentials });
export { s3Client };