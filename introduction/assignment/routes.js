const routeHandlers = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write("<body>");
    res.write("<h1>Hello there!</h1>");
    res.write("<form action='/create-user' method='POST'>");
    res.write("<input type='text' name='message'></input>");
    res.write('<button type="submit">Send</button>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      res.statusCode = 302;
    });
    res.setHeader("Location", "/");
    res.end();
    console.log(message);
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write("<body><ul><li>Josephine</li><li>Gyamera</li></ul></body>");
    res.write("</html>");
    return res.end();
  }
};

module.exports = routeHandlers;
