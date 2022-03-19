import { fetchOrderById } from "../api";
import {fetchAllOrders, bucketOrdersByUsers, getLast2WeeksOrders, bucketOrdersByDate} from "./ecommerce"
const ORDER_ID = "70ef599e5eca171b2bce84d1"
test("Ecommerce - fetchOrderById", async () => {
    let orders = await fetchOrderById(ORDER_ID);
    expect(orders).toBeTruthy();
});

test("fetch all orders", async()=>{
    const allOrders = await fetchAllOrders();
    expect(allOrders.length).toBe(100);
});

test("return object with key as user and value as array of orders ", async ()=>{
    const obj = await bucketOrdersByUsers();
    const objKeys = Object.keys(obj)
    objKeys.forEach((key)=>{
        for(const order of obj[key]){
            expect(order.userId).toBe(key);
        }
    })
})

test("return array with last two weeks orders", async()=>{
    const last2WeeksOrders = await getLast2WeeksOrders();
    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate()-14);
    last2WeeksOrders.forEach((order) => {
        expect(Number(order.timestamp)).toBeGreaterThan(Number(Date.parse(currentTime) / 1000));
    })
});

test("return object with key as date and value as array of orders ", async ()=>{
    const obj = await bucketOrdersByDate();
    const objKeys = Object.keys(obj)
    objKeys.forEach((key)=>{
        for(const order of obj[key]){
            expect(new Date(order.timestamp).toISOString().split('T')[0]).toBe(key);
        }
    })
})

