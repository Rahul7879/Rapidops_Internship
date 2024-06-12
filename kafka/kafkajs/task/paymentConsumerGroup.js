// paymentsConsumerGroup.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'payments-consumer-group',
  brokers: ['localhost:9092']
});

const consumerGroup = async (groupId) => {
  const consumer = kafka.consumer({ groupId });

  await consumer.connect();
  await consumer.subscribe({ topic: 'paymentss', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`[${groupId}] Message: ${message.value.toString()} from partition ${partition}`);
    }
  });
};

consumerGroup('payments-group-1').catch(console.error);
consumerGroup('payments-group-2').catch(console.error);
