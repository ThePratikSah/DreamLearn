import { Message } from "@aws-sdk/client-sqs";
import type { S3Event } from "aws-lambda";
import { startDockerLocally } from "./utils/docker";
import { runECSTask } from "./utils/ecsClient";
import { getContainerLogs } from "./utils/containerLogs";

const env = process.env.ENV || "DEV";
console.log({ env });

export async function sqsHandler(message: Message) {
  try {
    const { Body } = message;

    if (!Body) {
      return console.log("no body");
    }
    const s3Event: S3Event = JSON.parse(Body);
    if ("Service" in s3Event && "Event" in s3Event) {
      if (s3Event.Event === "s3:TestEvent") {
        return;
      }
    }

    for (const record of s3Event.Records) {
      const { s3 } = record;
      const {
        object: { key },
      } = s3;

      if (env === "DEV") {
        console.log("Running task locally...");
        const id = await startDockerLocally(key);
        console.log("Task started");
        await getContainerLogs(id);
      } else {
        console.log("Running new task on ECS...");
        await runECSTask(key);
        console.log("Task started");
      }
    }
  } catch (error) {
    console.error(error);
  }
}
