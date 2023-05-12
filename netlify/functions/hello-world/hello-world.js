// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    const data = event
    const response = data
    // const response = {
    //   "product_id":data.retailerId,
    //   "price":data.price.amount,
    //   "original_price":data.price.amount,
    //   "quantity":data.quantity  
    // }
  
    return {
      statusCode: 200,
      body: JSON.stringify(response),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
