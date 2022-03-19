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


const bucketOrdersByUsers = () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    return ordersByUsers;
};

const getLast2WeeksOrders = () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
};

const bucketOrdersByDate = () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    return ordersByDate;
};

(async()=> {
    const allOrders = await fetchAllOrders()
    console.log(allOrders)
})();

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
