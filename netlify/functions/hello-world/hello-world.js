// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require('axios');
const handler = async (event) => {
  try {
    // const body = JSON.parse(event.body)
    // const order = JSON.parse(body.order)
    // const catalog = JSON.parse(body.catalog)
    // const items = catalog.items
    // let result = []
    // items.forEach(item => {
    //   result.push({
    //     "product_id":item.retailerId,
    //     "price":item.price.amount,
    //     "original_price":item.price.amount,
    //     "quantity":item.quantity
    //   })
    // }) 

    // const trayURL = 'https://octadeskchat.commercesuite.com.br/web_api/orders?access_token=APP_ID-3913-STORE_ID-1156053-b0401b99e49b34e716410f181f8074b4efab46657ed6195ce5e141655ff23e15'
    // const trayObject = {'Order': order, 'ProductsSold': result }
    // const trayResult = axios.post(trayURL, trayObject)

    return {
      statusCode: 200,
      body: JSON.stringify(event),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
module.exports = { handler }
