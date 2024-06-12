const kafka = require('kafka-node');

const paymentConsumerGroupOptions = {
    kafkaHost: 'localhost:9092',
    groupId: 'payment_group',
    autoCommit: true,
    fromOffset: 'latest'
};

const paymentConsumer1 = new kafka.ConsumerGroup(paymentConsumerGroupOptions, ['payments']);
// const paymentConsumer2 = new kafka.ConsumerGroup(paymentConsumerGroupOptions, ['payments']);

paymentConsumer1.on('message', (message) => {
    console.log('Payment Consumer 1 Received message:', message);
});

// paymentConsumer2.on('message', (message) => {
//     console.log('Payment Consumer 2 Received message:', message);
// });

paymentConsumer1.on('error', (err) => {
    console.error('Payment Consumer 1 error:', err);
});

// paymentConsumer2.on('error', (err) => {
//     console.error('Payment Consumer 2 error:', err);
// });
