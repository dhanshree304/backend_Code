const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  if (request.url === "/posts") {
    response.setHeader("content-type", "application/json");
    return response.end(
      JSON.stringify([{ name: "posts1" }, { name: "posts2" }])
    );
  } else if (request.method === "GET") {
    if (request.url === "/data") {
      console.log(request.method);
      const data = fs.readFileSync("./data.json", { encoding: "utf-8" });
      response.setHeader("content-type", "application/json");
      return response.end(JSON.stringify(data)); //it gets in unreadable manner becoz we stringify it
      //if we do it in parse manner it get readble.
    }
  } else if (request.url === "/") {
    response.setHeader("content-type", "text/html");
    return response.end("<h4>Wellcome to home Page</h4>");
  } else if (request.method === "POST") {
    if (request.url === "/uploaddata") {
      let str = "";
      response.on("data", function (chunk) {
        console.log(chunk);
        str += chunk;
      });
      console.log(str);
      fs.writeFileSync("./data.text", str, { encoding: "utf-8" });
      response.end("your data is uploaded");
    }
  } else {
    return response.end("Invalid route");
  }
});
server.listen(6000);
