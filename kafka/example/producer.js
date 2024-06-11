const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
    console.log('Producer is ready');
    const payloads = [
        { topic: 'test', messages: 'Hello Kafka' }
    ];
    setInterval(() => {
        producer.send(payloads, (err, data) => {
            if (err) {
                console.error('Error sending message:', err);
            } else {
                console.log('Message sent:', data);
            }
        })
    },1000);
});

producer.on('error', (err) => {
    console.error('Producer error:', err);
});