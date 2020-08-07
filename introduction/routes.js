const fs = require("fs");

const requestHandlers = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Test</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    //return on end to prevent this method from not executing before end
    return req.on("end", () => {
      //Buffer is like a bus stop that stops different request during parsing stage
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Test</title></head>");
  res.write("<body><h1>Hello there!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandlers;
