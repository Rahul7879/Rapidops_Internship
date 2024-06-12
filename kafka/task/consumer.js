const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer1 = new kafka.ConsumerGroup({
    kafkaHost: 'localhost:9092',
    groupId: 'my_group',
    fromOffset: 'latest'
}, ['my_topic']);
const consumer2 = new kafka.ConsumerGroup({
    kafkaHost: 'localhost:9092',
    groupId: 'my_group',
    fromOffset: 'latest'
}, ['my_topic']);

consumer1.on('message', (message) => {
    console.log('Consumer 1 Received message:', message);
});

consumer2.on('message', (message) => {
    console.log('Consumer 2 Received message:', message);
});

consumer1.on('error', (err) => {
    console.error('Consumer 1 error:', err);
});

consumer2.on('error', (err) => {
    console.error('Consumer 2 error:', err);
});
