// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require("axios");
const handler = (event) => {
  try {
    const body = JSON.parse(event.body);
    const order = body.Order;
    const token = body.access_token;
    const catalog = JSON.parse(body.catalog);
    const items = catalog.items;
    let result = [];
    items.forEach((item) => {
      result.push({
        product_id: item.retailerId,
        price: item.price.amount,
        original_price: item.price.amount,
        quantity: item.quantity,
      });
    });

    const trayURL = `https://octadeskchat.commercesuite.com.br/web_api/orders?access_token=${token}`;
    const trayObject = JSON.stringify({ Order: order, ProductsSold: result });
  let trayResult = '123';
    axios.post(
      trayURL, trayObject,{
        headers: {
            'Content-Type': 'application/json',
        }
    }
    ).then(function (response) {
trayResult = response
return {
  statusCode: 200,
  body: JSON.stringify(JSON.stringify(trayResult)),
};
    });

  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
module.exports = { handler };
