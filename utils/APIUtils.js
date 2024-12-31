class APIUtils {
    constructor(apiContext,loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
   
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            })//200,201,
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        //console.log("getToken : ",token);
        return token;

    }
    
    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        //console.log("createOrder : ", orderPayload, response);
    
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                "Authorization": response?.token,
                "Content-Type": "application/json"
            }
        });
    
        const orderResponseJson = await orderResponse.json();
        //console.log("orderRes : ", orderResponseJson);
    
        // Check if orderResponseJson and orderResponseJson.orders are defined
        if (orderResponseJson && orderResponseJson.orders && orderResponseJson.orders.length > 0) {
            const orderId = orderResponseJson.orders[0];
            console.log("orders: " + orderId);
            response.orderId = orderId;
        } else {
            console.error("No orders found in the response");
        }
    
        return response;
    }
}

module.exports = { APIUtils };
