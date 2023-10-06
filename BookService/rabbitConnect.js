import amqp from "amqplib/callback_api.js"
async function rabbitConnect (){
    const amqpServer = process.env.RABBITMQ_CONNECTION_STRING
    return new Promise((resolve, reject)=>{
        amqp.connect(amqpServer, (connectionErr, connection)=>{
            if(connectionErr){
                console.log(connectionErr);
                reject(connectionErr)
            }
            connection.createChannel((channelError, channel)=>{
                if(channelError){
                    console.log(channelError)
                    reject (channelError)
                }
                channel.assertQueue("BOOK")
                resolve(channel)
            })
        })
        
    })
}

export default rabbitConnect