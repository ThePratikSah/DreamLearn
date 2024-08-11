export const tempQueueUrl = process.env.AWS_TEMP_QUEUE_URL || "";
export const tempBucketName = process.env.AWS_TEMP_BUCKET || "";
export const prodBucketName = process.env.AWS_PROD_BUCKET || "";
export const awsAccessKey = process.env.AWS_ACCESS_KEY || "";
export const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
export const awsRegion = process.env.AWS_REGION || "ap-south-1";
export const awsTaskDef = process.env.AWS_TASK_DEF || "";
export const awsEcsCluster = process.env.AWS_ECS_CLUSTER || "";
export const awsConfig = {
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
  },
};
