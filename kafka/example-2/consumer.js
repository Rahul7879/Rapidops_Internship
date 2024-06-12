const kafka = require('kafka-node');
const ConsumerGroup = kafka.ConsumerGroup;

const options1 = {
    kafkaHost: 'localhost:9092',
    groupId: 'group1',
    sessionTimeout: 15000,
    protocol: ['roundrobin'],
    fromOffset: 'earliest'
};

const options2 = {
    kafkaHost: 'localhost:9092',
    groupId: 'group2',
    sessionTimeout: 15000,
    protocol: ['roundrobin'],
    fromOffset: 'earliest'
};

const consumer1 = new ConsumerGroup(options1, ['topic1']);
const consumer2 = new ConsumerGroup(options2, ['topic2']);

consumer1.on('message', function (message) {
    console.log('Consumer 1 received message:', message.value);
});

consumer2.on('message', function (message) {
    console.log('Consumer 2 received message:', message.value);
});

consumer1.on('error', function (err) {
    console.error('Error connecting to Kafka:', err);
});

consumer2.on('error', function (err) {
    console.error('Error connecting to Kafka:', err);
});
