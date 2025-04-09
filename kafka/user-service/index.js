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

        if (!user.email || !user.name) return res.status(422).send("User name of email are invalid");

        await producer.send({
            topic: 'user-events',
            messages: [
                {
                    value: JSON.stringify({
                        eventType: 'user-registered',
                        data: user,
                    }),
                },
            ],
        });

        res.send('User registered and event published');
    });

    app.listen(3000, () => console.log('User service on port 3000'));
};

run().catch(console.error);
