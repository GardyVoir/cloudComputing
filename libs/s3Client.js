import { S3Client } from "@aws-sdk/client-s3";
import { json } from "node:stream/consumers";
import credentials from "./.aws/credentials.json" assert {type: 'json'};
// Set the AWS Region.
const REGION = "eu-west-3"; //e.g. "us-east-1"
const CREDENTIALS = ""
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION, credentials: credentials });
export { s3Client };