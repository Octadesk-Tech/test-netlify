// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const handler = async (event) => {
  try {
    conspole.log(event)
    // const data = JSON.parse(event).items[0]
    // const response = {
    //   "product_id":data.retailerId,
    //   "price":data.price.amount,
    //   "original_price":data.price.amount,
    //   "quantity":data.quantity  
    // }
    // console.log(response)
  
    return {
      statusCode: 200,
      body: typeof event,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
handler()
module.exports = { handler }
