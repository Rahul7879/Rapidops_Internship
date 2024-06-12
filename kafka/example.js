const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

// Create a Kafka producer
const producer = new Producer(client);

// Event listener for producer ready
producer.on('ready', function () {
    console.log('Producer is ready');

    // Produce messages to a topic
    setInterval(() => {
        const message = new Date().toISOString();
        const payloads = [{ topic: 'test-topic', messages: message }];
        producer.send(payloads, function (err, data) {
            if (err) {
                console.error('Error producing message', err);
            } else {
                console.log('Producer sent message:', message);
            }
        });
    }, 1000);
});

// Event listener for producer error
producer.on('error', function (err) {
    console.error('Error connecting to Kafka:', err);
});

// Create a Kafka consumer
const consumer = new Consumer(
    client,
    [{ topic: 'test-topic', partition: 0 }],
    { autoCommit: false }
);

// Event listener for consumer message
consumer.on('message', function (message) {
    console.log('Consumer received message:', message.value);

    // Simulate processing of the message
    setTimeout(() => {
        console.log('Message processed:', message.value);
    }, 2000);
});

// Event listener for consumer error
consumer.on('error', function (err) {
    console.error('Error connecting to Kafka:', err);
});
