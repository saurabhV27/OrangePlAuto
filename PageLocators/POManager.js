const {loginPage}=require('../PageLocators/loginPage');
const {dashboardPage} = require('../PageLocators/dashboardPage');
const {cartPage} = require('../PageLocators/cartPage');
const {paymentPage} = require('../PageLocators/paymentPage');
const {orderStatusPage} = require('../PageLocators/orderStatusPage');
const {myOrderPage} = require('../PageLocators/myOrderPage');



class POManager{
    constructor(page){

        this.login = new loginPage(page);
        this.dashBoard = new dashboardPage(page);
        this.cart = new cartPage(page);
        this.payment = new paymentPage(page);
        this.status = new orderStatusPage(page);
        this.myOrder = new myOrderPage(page);

    }

    getLogin(){
        return this.login;
    }

    getDashboard(){
        return this.dashBoard;
    }

    getCart(){
        return this.cart;
    }

    getPayment(){
        return this.payment;
    }

    getOrderStatus(){
        return this.status;
    }

    getMyOrders(){
        return this.myOrder;
    }
}
module.exports={POManager};