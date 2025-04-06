const { Kafka } = require('kafkajs');
const express = require('express');
const app = express();

app.use(express.json());

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  app.post('/register', async (req, res) => {
    const user = req.body;
    await producer.send({
      topic: 'user-registered',
      messages: [{ value: JSON.stringify(user) }],
    });

    await producer.send({
        topic: 'user-events',
        messages: [
          {
            value: JSON.stringify({
              eventType: 'user-registered',
              data: { email: 'test@example.com', name: 'Test User' },
            }),
          },
        ],
      });
      

    res.send('User registered and event published');
  });

  app.listen(3000, () => console.log('User service on port 3000'));
};

run().catch(console.error);
