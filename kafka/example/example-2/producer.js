const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const producer1 = new Producer(client);
const producer2 = new Producer(client);

producer1.on('ready', function () {
    console.log('Producer 1 is ready');
    produceMessages(producer1, 'topic1');
});

producer2.on('ready', function () {
    console.log('Producer 2 is ready');
    produceMessages(producer2, 'topic2');
});

function produceMessages(producer, topic) {
    setInterval(() => {
        const message = new Date().toISOString();
        const payloads = [{ topic: topic, messages: message }];
        producer.send(payloads, function (err, data) {
            if (err) {
                console.error('Error producing message', err);
            } else {
                console.log('Producer sent message to', topic);
            }
        });
    }, 2000);
}

producer1.on('error', function (err) {
    console.error('Error connecting to Kafka:', err);
});

producer2.on('error', function (err) {
    console.error('Error connecting to Kafka:', err);
});
