// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require('axios');
const handler = async (event) => {
  try {
    const body = JSON.parse(JSON.parse(event.body))
    const order = body.Order
    const token = body.access_token
    const catalog = JSON.parse(body.catalog)
    const items = catalog.items
    let result = []
    items.forEach(item => {
      result.push({
        "product_id":item.retailerId,
        "price":item.price.amount,
        "original_price":item.price.amount,
        "quantity":item.quantity
      })
    }) 

    const trayURL = `https://octadeskchat.commercesuite.com.br/web_api/orders?access_token=${token}`
    const trayObject = {'Order': order, 'ProductsSold': result }
    const trayResult = await axios({
      method: 'post',
      url: trayURL,
      data: {...trayObject}
    });
    console.log(trayResult.data)
    return {
      statusCode: 200,
      body: JSON.stringify(trayResult.data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
module.exports = { handler }
