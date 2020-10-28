var request = require("request");
const { exec } = require("child_process");
const fs = require("fs");

const ngRok_connection_reset_interval = 1000; /*miliseconds*/
const ngRokAPI = "http://127.0.0.1:4040/api/tunnels";

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
  let configPayload = `window.config={ url: "${newUrl}", local:"http://localhost:8000"}`;
  fs.writeFileSync("./client/public/config.js", configPayload);
  fs.writeFileSync("./client/build/config.js", configPayload);
  try {
    const { stdout, stderr } = await exec(`./bashScripts/updateNewUrl.sh`);
  } catch (e) {
    console.error(e);
  }
}

setInterval(async () => {
  try {
    var resp = await sendRequest(ngRokAPI);
    if (resp) {
      resp = JSON.parse(resp.body);
      resp = resp.tunnels.find((e) => e.name == "command_line (http)");
      if (connectionStateUrl.slice(5) != resp.public_url.slice(4)) {
        console.log(connectionStateUrl, resp.public_url);
        connectionStateUrl = "https"+resp.public_url.slice(4);
        await commitNewUrl(connectionStateUrl);
      }
    } else {
      console.error("perhaps ngrok is not running");
    }
  } catch (e) {
    // console.error(e);
  }
}, ngRok_connection_reset_interval);
