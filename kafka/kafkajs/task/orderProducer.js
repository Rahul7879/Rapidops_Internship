// ordersProducer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'orders-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const sendMessage = async () => {
  await producer.connect();

  setInterval(async () => {
    const partition = Math.floor(Math.random() * 5); // Randomly choose a partition
    await producer.send({
      topic: 'orderss',
      messages: [{ key: `key-${partition}`, value: `Order message to partition ${partition}` }],
      partition
    });

    console.log(`Sent message to partition ${partition}`);
  }, 1000); // Send message every second
};

sendMessage().catch(console.error);
