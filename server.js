const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((request, response) => {
  console.log("request made.");
  console.log("request url =>", request.url);
  console.log("request type =>", request.method);

  // just to demonstrate using npm package : lodash
  const num = _.random(0, 20);
  console.log("num =>", num);

  // set header content type
  // response.setHeader("Content-Type", "text/plain");
  // response.write("hello world!");

  // sending html
  // response.setHeader("Content-Type", "text/html");
  // response.write("<h1>hello world</h1>");
  // response.end();

  let path = "./views/";
  switch(request.url) {
    case "/":
      path += "index.html";
      response.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      response.statusCode = 200;
      break;
    case "/about-blah":
      response.setHeader("Location", "/about");
      response.statusCode = 301;
      // response.end();
      break;
    default:
      path += "404.html";
      response.statusCode = 404;
      break;
  }

  response.setHeader("Content-Type", "text/html");
  fs.readFile(path, (error, data) => {
    if (error) {
      console.log("error while reading file.");
      response.end();
    } else {
      // response.write(data);
      response.end(data);
    }
  })
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000.");
});