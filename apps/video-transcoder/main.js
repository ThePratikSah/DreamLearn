const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("node:fs/promises");
const nodeFs = require("node:fs");
const path = require("node:path");

const ffmpeg = require("fluent-ffmpeg");

const awsRegion = process.env.AWS_REGION || "ap-south-1";
const tempBucketName = process.env.AWS_TEMP_BUCKET;
const prodBucketName = process.env.AWS_PROD_BUCKET;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const key = process.env.KEY;

const resolutions = [
  { name: "720p", width: 1280, height: 720 },
  { name: "480p", width: 854, height: 480 },
];

const s3Client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
  },
});

async function main() {
  console.log("Starting transcoding...");
  try {
    const command = new GetObjectCommand({
      Bucket: tempBucketName,
      Key: key,
    });

    const result = await s3Client.send(command);
    const originalFilePath = "original-video.mp4";

    console.log("Downloading video...");
    await fs.writeFile(originalFilePath, result.Body);

    const originalVideoPath = path.join(originalFilePath);

    console.log("Transcoding video...");
    const promises = resolutions.map(async (resolution) => {
      const outputFilePath = `${resolution.name}-video.mp4`;

      return new Promise((resolve, reject) => {
        ffmpeg(originalVideoPath)
          .output(outputFilePath)
          .withSize(`${resolution.width}x${resolution.height}`)
          .withVideoCodec("libx264")
          .withAudioCodec("aac")
          .format("mp4")
          .on("error", (err) => {
            console.error(err);
            reject(err);
          })
          .on("end", () => {
            console.log(`Transcoded ${outputFilePath}`);

            console.log("Uploading transcoded video...");
            const putObjCmd = new PutObjectCommand({
              Bucket: prodBucketName,
              Key: outputFilePath,
              Body: nodeFs.createReadStream(path.resolve(outputFilePath)),
            });
            s3Client
              .send(putObjCmd)
              .then(() => {
                console.log(`Uploaded ${outputFilePath}`);
                resolve();
              })
              .catch((err) => {
                console.error("Failed to upload", err);
                reject(err);
              });
          })
          .run();
      });
    });

    await Promise.allSettled(promises);
    console.log("Transcoding complete");
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
}

main();
