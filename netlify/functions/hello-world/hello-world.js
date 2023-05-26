// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require("axios");
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

    const trayURL = `https://octadeskchat.commercesuite.com.br/web_api/orders?access_token=${token}`;
    const trayObject = JSON.stringify({
      "Order":{
        "point_sale":"Whastapp",
        "shipment":"Retirar no local",
        "Customer":{"type":"0",
        "name":"Gabriel teste",
        "cpf":"45062954800",
        "email":"gabriel.miranda.rubio@gmail.com",
        "phone":"+55 11 98471 4265",
        "CustomerAddress":[{
            "address":"Rua professor dario ribeiro",
            "zip_code":"02559000",
            "number":"937",
            "complement":"",
            "neighborhood":"Vila Prado",
            "city":"São Paulo",
            "state":"SP",
            "country":"BRA",
            "type": "1"
            }
        ]},
        "ProductsSold":[{
            "product_id":27,
            "price":"150.00",
            "original_price":"150.00",
            "quantity":1  
          }
        ]
      }    
  });
  let trayResult 
    axios.post(
      trayURL, trayObject 
    ).then(r) {
trayResult = r
    };
    return {
      statusCode: 200,
      body: JSON.stringify(trayResult),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
module.exports = { handler };
