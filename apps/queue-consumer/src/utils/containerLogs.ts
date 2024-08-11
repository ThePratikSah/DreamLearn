import axios from "axios";

export const getContainerLogs = async (containerId: string) => {
  const dockerSocket = "/var/run/docker.sock";
  axios({
    method: "get",
    url: `http://localhost/containers/${containerId}/logs`,
    socketPath: dockerSocket,
    params: {
      stdout: true,
      stderr: true,
      follow: true,
    },
    responseType: "stream",
  })
    .then((response) => {
      response.data.on("data", (chunk: any) => {
        console.log(chunk.toString());
      });

      response.data.on("end", () => {
        console.log("Stream ended.");
      });

      response.data.on("error", (error: Error) => {
        console.error("Stream error:", error);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
