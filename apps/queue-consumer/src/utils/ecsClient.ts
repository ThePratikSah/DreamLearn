import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import { awsConfig, awsEcsCluster, awsTaskDef } from "../config";

export async function runECSTask(key: string) {
  const ecsClient = new ECSClient(awsConfig);
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
