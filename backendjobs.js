var request = require("request");
const { exec } = require("child_process");
const fs = require("fs")

const ngRok_connection_reset_interval = 1000; /*miliseconds*/
var connectionStateUrl = "";
async function sendRequest(requestUrl) {
  return new Promise((resolve, reject) => {
    request(requestUrl, function (error, response, body) {
      if (error) {
        reject(error);
      }
      resolve({ body, response });
    });
  });
}

async function commitNewUrl(newUrl) {
  console.log("updating new backend public url to ", newUrl);
  let configPayload = JSON.stringify({ url: newUrl });
  console.log(configPayload)
  fs.writeFileSync("./client/src/config.json","configPayload")
  try {
    var stdout,
      stderr = await exec(`./bashScripts/updateNewUrl.sh`);
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  } catch (e) {
    console.error(e);
  }
}

const ngRokAPI = "http://127.0.0.1:4040/api/tunnels";

setInterval(async () => {
  try {
    var resp = await sendRequest(ngRokAPI);
    resp = JSON.parse(resp.body);
    resp = resp.tunnels.find((e) => e.name == "command_line (http)");

    console.log(connectionStateUrl, resp.public_url);
    if (connectionStateUrl != resp.public_url) {
      console.log(connectionStateUrl, resp.public_url);
      connectionStateUrl = resp.public_url;
      // frigger new commit for fronend
      commitNewUrl(connectionStateUrl);
    }
  } catch (e) {
    console.error(e);
  }
}, ngRok_connection_reset_interval);
