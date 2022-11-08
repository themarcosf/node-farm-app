const fs = require("fs");
const http = require("http");
const url = require("url");
const { retrieveCard, overviewCards, httpHead } = require("./utils");

// VARIABLES
const port = 8000;
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
);
const template_CARD = fs.readFileSync(
  `${__dirname}/templates/card.html`,
  "utf-8"
);
const template_OVERVIEW = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf8"
);
const template_PRODUCT = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf8"
);

// SERVER
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // ROUTER
  switch (pathname) {
    case "/":
      httpHead(res);
      res.end(overviewCards(template_OVERVIEW, template_CARD, data));
      break;
    case "/products":
      httpHead(res);
      res.end(retrieveCard(template_PRODUCT, data[query.id]));
      break;
    default:
      httpHead(res, 404);
      res.end("Erro");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Server running on port ${port}`);
});

////////////////////////////////////////////////////////
