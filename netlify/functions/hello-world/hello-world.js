// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const handler = async (event) => {
  try {
    const items = JSON.parse(JSON.parse(event.body)).items[0]
    const response = {
      "product_id":items.retailerId,
      "price":items.price.amount,
      "original_price":items.price.amount,
      "quantity":items.quantity  
    }
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
module.exports = { handler }
