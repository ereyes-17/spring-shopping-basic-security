export default class Purchase {
    constructor(userId, productId, price, purchaseTime, id) {
        this.price = price;
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.purchaseTime = purchaseTime;
    }
}