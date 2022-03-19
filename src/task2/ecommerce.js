////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api/index.js";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = async () => {
    const ids = allIds;
    const AllOrders = ids.map((id)=>{
        return fetchOrderById(id);
    })
    return Promise.all(AllOrders)
};


const bucketOrdersByUsers = async () => {
    const ordersByUsers = {};
    const allOrders = await fetchAllOrders();
    allOrders.forEach((Order)=>{
        if(ordersByUsers.hasOwnProperty(Order.userId)){
            ordersByUsers[Order.userId].push(Order)
        }else{
            ordersByUsers[Order.userId] = [Order]
        }
    })
    return ordersByUsers;
};

const getLast2WeeksOrders = async () => {
    const lastTwoWeekOrders = [];
    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate()-14);
    const allOrders = await fetchAllOrders();
    allOrders.map((order)=>{
        if(new Date(order.timestamp) > currentTime){
            lastTwoWeekOrders.push(order);
        }
    })
    return lastTwoWeekOrders;
};

const bucketOrdersByDate = () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    return ordersByDate;
};

// (async()=> {
//     const allOrders = await fetchAllOrders()
//     console.log(allOrders)
// })();

// (async()=> {
//     const ordersByUsers = await bucketOrdersByUsers()
//     console.log(ordersByUsers)
// })();


(async()=> {
    const ordersByUsers = await getLast2WeeksOrders()
    console.log(ordersByUsers)
})();


bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
