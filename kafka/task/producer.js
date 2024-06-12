const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
    setInterval(() => {
        const payloads = [
            { topic: 'my_topic', partitions: 5, messages: 'Hello Kafka!' }
        ];
        producer.send(payloads, (err, data) => {
            if (err) {
                console.error('Error sending message:', err);
            } else {
                console.log('Message sent:', data);
            }
        });
    }, 3000);
});

producer.on('error', (err) => {
    console.error('Producer error:', err);
});
