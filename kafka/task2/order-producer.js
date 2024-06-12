const kafka = require('kafka-node');

const orderClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const orderProducer = new kafka.Producer(orderClient);

orderProducer.on('ready', () => {
    setInterval(() => {
        const orderMessage = {
            orderId: Math.floor(Math.random() * 1000),
            userId: Math.floor(Math.random() * 100),
            item: 'item-' + Math.floor(Math.random() * 10),
            quantity: Math.floor(Math.random() * 5) + 1
        };

        const payloads = [
            { topic: 'orders', messages: JSON.stringify(orderMessage), partition: Math.floor(Math.random() * 3) }
        ];

        orderProducer.send(payloads, (err, data) => {
            if (err) {
                console.error('Error sending order message:', err);
            } else {
                console.log('Order message sent:', data);
            }
        });
    }, 2000); // Send an order message every 2 seconds
});

orderProducer.on('error', (err) => {
    console.error('Order Producer error:', err);
});
