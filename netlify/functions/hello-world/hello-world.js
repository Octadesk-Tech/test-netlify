// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const handler = async (event) => {
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

    var raw = JSON.stringify({
      "Order": {
         ...order, 'ProductsSold': result }      
    });
    
    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: 'follow'
    };
    let trayResult= await fetch("https://octadeskchat.commercesuite.com.br/web_api/orders?access_token=APP_ID-3913-STORE_ID-1156053-78fcbf79ec4a0062f5b26fe9b95d2057812c6296f7d1b6679a5c96dc2836023c", requestOptions)
    trayResult = await trayResult.text()

return {
  statusCode: 200,
  body: JSON.stringify(JSON.parse(trayResult)),
};
    

  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
module.exports = { handler };
