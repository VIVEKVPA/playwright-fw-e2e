class APIUtils {

    constructor(apiContext, loginRequest) {
        this.apiContext = apiContext
        this.loginRequest = loginRequest
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginRequest
            }
        )
        const loginResponseJson = await loginResponse.json()
        const token = await loginResponseJson.token
        console.log(token)
        return token
    }

    async createOrder(createOrdRequest) {
        let response = {}
        response.token = await this.getToken()
        const createOrdResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: createOrdRequest,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                },
            }
        )

        const createOrdResponseJson = await createOrdResponse.json()
        console.log(createOrdResponseJson)
        const orderId = await createOrdResponseJson.orders[0]
        response.orderId = orderId
        return response
    }
}
module.exports = { APIUtils }