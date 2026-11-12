// we would use razorpay instead of stripe
import * as dotenv from 'dotenv'
dotenv.config({path: './config/.env'})
import express from 'express'
import Stripe from 'stripe'
const testKey = process.env.TestKey
const stripeInstance = new Stripe(testKey)
const PORT = process.env.PORT || 9804
const app = express()

app.post('/process-payment', async(req, res)=>{
    // const {amount, currency, token} = req.body
    try {
        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: 5000,
            currency: "usd",
            payment_method: token,
            confirm: true
        })
        res.json({status: paymentIntent.status})
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });