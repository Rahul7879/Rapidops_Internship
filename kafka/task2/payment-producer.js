const kafka = require('kafka-node');

const paymentClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const paymentProducer = new kafka.Producer(paymentClient);

paymentProducer.on('ready', () => {
    setInterval(() => {
        const paymentMessage = {
            paymentId: Math.floor(Math.random() * 1000),
            orderId: Math.floor(Math.random() * 1000),
            amount: Math.floor(Math.random() * 1000) + 1,
            method: ['Credit Card', 'PayPal', 'Bank Transfer'][Math.floor(Math.random() * 3)]
        };

        const payloads = [
            { topic: 'payments', messages: JSON.stringify(paymentMessage), partition: Math.floor(Math.random() * 3) }
        ];

        paymentProducer.send(payloads, (err, data) => {
            if (err) {
                console.error('Error sending payment message:', err);
            } else {
                console.log('Payment message sent:', data);
            }
        });
    }, 3000); // Send a payment message every 3 seconds
});

paymentProducer.on('error', (err) => {
    console.error('Payment Producer error:', err);
});
