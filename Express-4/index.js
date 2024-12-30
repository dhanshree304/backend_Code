const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    if (request.url === "/posts") {
      console.log(request.method);
      const posts = fs.readFileSync("./posts.json", { encoding: "utf-8" });
      response.setHeader("content-type", "application/json");
      return response.end(JSON.stringify(posts));


    } else if (request.url === "/todos") {
      return response.end("mine todos are here");



    } else if (request.url === "/posts2") {
     const readStream = fs.createReadStream("./posts.json", {encoding: "utf-8" });
      readStream.pipe(response);//??
    }


  } else if (request.method === "POST") {
    if (request.url === "/uploaddata") {
      let str = "";
      request.on("data", function (packet) {
        str += packet;
      });
      request.on("end", () => {
        fs.writeFileSync("./dummy.txt", str, { encoding: "utf-8" });
        response.end("we have written your data in our file");
      });
    }



  } else {
    return response.end("Invalid route");
  }
});

server.listen(6000);


//readFile -> read the whole file and send that file
//streaming -> read small small pieces of it and sending those pieces.
