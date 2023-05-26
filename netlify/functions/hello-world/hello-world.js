// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require("axios");
const handler = async (event) => {
  try {
    // const body = JSON.parse(event.body);
    // const order = body.Order;
    // const token = body.access_token;
    // const catalog = JSON.parse(body.catalog);
    // const items = catalog.items;
    // let result = [];
    // items.forEach((item) => {
    //   result.push({
    //     product_id: item.retailerId,
    //     price: item.price.amount,
    //     original_price: item.price.amount,
    //     quantity: item.quantity,
    //   });
    // });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "Order": {
        "point_sale": "Whastapp",
        "shipment": "Retirar no local",
        "Customer": {
          "type": "0",
          "name": "Gabriel teste",
          "cpf": "45062954800",
          "email": "gabriel.miranda.rubio@gmail.com",
          "phone": "+55 11 98471 4265",
          "CustomerAddress": [
            {
              "address": "Rua professor dario ribeiro",
              "zip_code": "02559000",
              "number": "937",
              "complement": "",
              "neighborhood": "Vila Prado",
              "city": "São Paulo",
              "state": "SP",
              "country": "BRA",
              "type": "1"
            }
          ]
        },
        "ProductsSold": [
          {
            "product_id": 57,
            "price": "150.00",
            "original_price": "150.00",
            "quantity": 1
          }
        ]
      }
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let trayResult= await fetch("https://octadeskchat.commercesuite.com.br/web_api/orders?access_token=APP_ID-3913-STORE_ID-1156053-78fcbf79ec4a0062f5b26fe9b95d2057812c6296f7d1b6679a5c96dc2836023c", requestOptions)
    trayResult = await trayResult.text()

return {
  statusCode: 200,
  body: JSON.stringify(trayResult),
};
    

  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
module.exports = { handler };
