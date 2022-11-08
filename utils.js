/*
use regex to replace all instances of expression
*/
const retrieveCard = function (temp, el) {
  let _card = temp
    .replace(/{%DESCRIPTION%}/g, el.description)
    .replace(/{%ID%}/g, el.id)
    .replace(/{%IMG%}/g, el.image)
    .replace(/{%NUTRIENTS%}/g, el.nutrients)
    .replace(/{%ORIGIN%}/g, el.from)
    .replace(/{%PRICE%}/g, el.price)
    .replace(/{%PRODUCT%}/g, el.productName)
    .replace(/{%QUANTITY%}/g, el.quantity);

  return el.organic ? _card : _card.replace(/{%NOT-ORGANIC%}/g, "not-organic");
};

const overviewCards = function (temp, card, data) {
  const _data = data.map((el) => retrieveCard(card, el)).join();
  return temp.replace("{%CARD%}", _data);
};

const httpHead = function (res, status = 200) {
  return res.writeHead(status, {
    // prettier-ignore
    "Content-type": "text/html",
    // prettier-ignore
    "my-own-head": `${status}`,
  });
};

module.exports = { retrieveCard, overviewCards, httpHead };
