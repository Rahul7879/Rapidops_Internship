const kafka = require('kafka-node');

const orderConsumerGroupOptions = {
    kafkaHost: 'localhost:9092',
    groupId: 'order_group',
    autoCommit: true,
    fromOffset: 'latest'
};

const orderConsumer1 = new kafka.ConsumerGroup(orderConsumerGroupOptions, ['orders']);
const orderConsumer2 = new kafka.ConsumerGroup(orderConsumerGroupOptions, ['orders']);

orderConsumer1.on('message', (message) => {
    console.log('Order Consumer 1 Received message:', message);
});

orderConsumer2.on('message', (message) => {
    console.log('Order Consumer 2 Received message:', message);
});

orderConsumer1.on('error', (err) => {
    console.error('Order Consumer 1 error:', err);
});

orderConsumer2.on('error', (err) => {
    console.error('Order Consumer 2 error:', err);
});
