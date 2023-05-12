// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const handler = async (event) => {
  try {
    const body =JSON.parse(event.body)
    const catalog = JSON.parse(JSON.parse(body.catalog))
    const items = catalog.items
    const response = {
      "product_id":items.retailerId,
      "price":items.price.amount,
      "original_price":items.price.amount,
      "quantity":items.quantity
    }
    let result = []
    for(let item in items) {
      result.push({
        "product_id":item.retailerId,
        "price":item.price.amount,
        "original_price":item.price.amount,
        "quantity":item.quantity
      })
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result),

    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
module.exports = { handler }
