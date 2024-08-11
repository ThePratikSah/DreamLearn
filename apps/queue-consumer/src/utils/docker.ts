import Docker from "dockerode";
import {
  awsAccessKey,
  awsSecretAccessKey,
  prodBucketName,
  tempBucketName,
} from "../config";

export async function startDockerLocally(key: string): Promise<string> {
  const docker = new Docker();
  const container = await docker.createContainer({
    Image: "video-transcoder",
    Env: [
      "KEY=" + key,
      "AWS_TEMP_BUCKET=" + tempBucketName,
      "AWS_PROD_BUCKET=" + prodBucketName,
      "AWS_ACCESS_KEY=" + awsAccessKey,
      "AWS_SECRET_ACCESS_KEY=" + awsSecretAccessKey,
    ],
  });

  await container.start();
  return container.id;
}
