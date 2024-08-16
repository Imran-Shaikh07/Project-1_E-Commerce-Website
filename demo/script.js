document.addEventListener('DOMContentLoaded', async () => {
    const stripe = Stripe('your-publishable-key'); // Replace with your Stripe publishable key
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const form = document.getElementById('checkout-form');
    const submitButton = document.getElementById('submit-button');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;

        const { paymentMethod, error } = await stripe.createPaymentMethod('card', cardElement, {
            billing_details: { name: document.getElementById('cardholder-name').value }
        });

        if (error) {
            errorMessage.textContent = error.message;
            submitButton.disabled = false;
        } else {
            const response = await fetch('/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentMethodId: paymentMethod.id })
            });

            const paymentIntent = await response.json();

            if (paymentIntent.error) {
                errorMessage.textContent = paymentIntent.error;
                submitButton.disabled = false;
            } else {
                errorMessage.textContent = '';
                stripe.confirmCardPayment(paymentIntent.clientSecret)
                    .then((result) => {
                        if (result.error) {
                            errorMessage.textContent = result.error.message;
                        } else {
                            window.location.href = '/payment-success'; // Redirect to a success page
                        }
                    });
            }
        }
    });
});
