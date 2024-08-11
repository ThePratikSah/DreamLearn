import { Message } from "@aws-sdk/client-sqs";
import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import type { S3Event } from "aws-lambda";
import { awsConfig, awsEcsCluster, awsTaskDef } from "./config";

const ecsClient = new ECSClient(awsConfig);

export async function sqsHandler(message: Message) {
  try {
    const { MessageId, Body } = message;

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

      console.log("Running new task on ECS...");
      const taskRun = new RunTaskCommand({
        taskDefinition: awsTaskDef,
        cluster: awsEcsCluster,
        launchType: "FARGATE",
        networkConfiguration: {
          awsvpcConfiguration: {
            securityGroups: ["sg-478b0522"],
            assignPublicIp: "ENABLED",
            subnets: ["subnet-2aab1251", "subnet-f14e39bd", "subnet-259b9d4d"],
          },
        },
        overrides: {
          containerOverrides: [
            {
              name: "video-transcoder",
              environment: [{ name: "KEY", value: key }],
            },
          ],
        },
      });

      await ecsClient.send(taskRun);
    }
  } catch (error) {
    console.error(error);
  }
}
