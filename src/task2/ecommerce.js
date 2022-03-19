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

const bucketOrdersByDate = async () => {
    const ordersByDate = {};
    const allOrders = await fetchAllOrders();
    allOrders.map((order)=>{
        const orderDate = new Date(order.timestamp).toISOString().split('T')[0]
        console.log(orderDate);
        if(ordersByDate.hasOwnProperty(orderDate)){
            ordersByDate[orderDate].push(order);
        }else{
            ordersByDate[orderDate] = [order];
        }
    })
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


// (async()=> {
//     const ordersByUsers = await getLast2WeeksOrders()
//     console.log(ordersByUsers)
// })();


(async()=> {
        const ordersByUsers = await bucketOrdersByDate()
        console.log(ordersByUsers)
    })();

////////////////////////////////////////
