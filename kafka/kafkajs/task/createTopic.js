const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'admin-client',
  brokers: ['localhost:9092']
});

const admin = kafka.admin();

const createTopics = async () => {
  await admin.connect();
  await admin.createTopics({
    topics: [
      { topic: 'orderss', numPartitions: 5, replicationFactor: 1 },
      { topic: 'paymentss', numPartitions: 5, replicationFactor: 1 }
    ]
  });
  await admin.disconnect();
};

createTopics().catch(console.error);
