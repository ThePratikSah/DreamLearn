import { Message } from "@aws-sdk/client-sqs";
import type { S3Event } from "aws-lambda";

export async function sqsHandler(message: Message) {
  try {
    const { MessageId, Body } = message;

    if (!Body) {
      return console.log("no body");
    }
    const s3Event: S3Event = JSON.parse(Body);

    console.log({ s3Event });
  } catch (error) {
    console.error(error);
  }
}
