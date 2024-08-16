const express = require('express');
const app = express();
const stripe = require('stripe')('your-secret-key'); // Replace with your Stripe secret key

app.use(express.static('public'));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const { paymentMethodId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirmation_method: 'manual',
            confirm: true
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
