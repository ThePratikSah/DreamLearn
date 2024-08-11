import { SQSClient } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";
import { awsAccessKey, awsSecretAccessKey, tempQueueUrl } from "./config";
import { sqsHandler } from "./sqshandler";

const app = Consumer.create({
  queueUrl: tempQueueUrl,
  handleMessage: sqsHandler,
  sqs: new SQSClient({
    region: "ap-south-1",
    credentials: {
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecretAccessKey,
    },
  }),
});

app.on("error", (err) => {
  console.error(err.message);
});

app.on("processing_error", (err) => {
  console.error(err.message);
});

app.on("timeout_error", (err) => {
  console.error(err.message);
});

app.start();
