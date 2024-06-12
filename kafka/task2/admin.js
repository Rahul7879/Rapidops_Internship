const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const admin = new kafka.Admin(client);

const topics = [
    { topic: 'orders', partitions: 3, replicationFactor: 1 },
    { topic: 'payments', partitions: 3, replicationFactor: 1 }
];

admin.createTopics(topics, (err, result) => {
    if (err) {
        console.error('Error creating topics:', err);
    } else {
        console.log('Topics created successfully:', result);
    }
});
