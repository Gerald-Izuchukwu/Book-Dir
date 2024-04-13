import axios from "axios"
import rabbitConnect from "./rabbitConnect.js"
import Rents from "./rentModel.js"
export class RentOrder{
    rent = async function(req, res, next){
        try {
            await rabbitConnect().then((channel)=>{
                channel.consume('RENT', data=>{
                    console.log('consuming from RENT Queue')
                    const {books, duration, user } = JSON.parse(data.content)
                    console.log(books);
                    let totalPrice = 0
                    for(let i =0; i<books.length; i++){
                        totalPrice = totalPrice + books[i].rentPrice
                    }

                    Rents.create({
                        books,
                        totalPrice,
                        duration,
                        user
                    }).then((data)=>{
                        console.log('Sending to BOOK Queue');
                        channel.sendToQueue("BOOK", Buffer.from(JSON.stringify({data})))
                    })

                    channel.ack(data)
                })
                setTimeout(()=>{
                    channel.close()
                }, 2000)
            })
        } catch (error) {
            console.log(error);
            
        }
    }
}
