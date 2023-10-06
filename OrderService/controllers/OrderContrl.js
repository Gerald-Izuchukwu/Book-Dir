import axios from "axios"
import rabbitConnect from "../rabbitConnect.js"
import Orders from "../models/OrderModel.js"

class Order{
    placeOrder = async function(req, res, next) {   
        try {
            await rabbitConnect().then((channel)=>{

                channel.consume("ORDER", data=>{
                    console.log('consuming from ORDER QUEUE');
                    const {books} = JSON.parse(data.content)
                    console.log(books);
                    let totalPrice = 0
                    for(let i = 0; i<books.length; i++){
                        totalPrice = totalPrice + books[i].price
                    }

                    Orders.create({
                        books,
                        totalPrice,
                        user : "me"
                    }).then((data)=>{
                        console.log('Sending to BOOK Queue');
                        channel.sendToQueue("BOOK", Buffer.from(JSON.stringify({data})))
                    })

                })
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    hi = function(req, res, next){
        return res.send('Hi')
    }
}

export default Order