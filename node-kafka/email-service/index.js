const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'email-service',
    brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'email-group' });

const run = async () => {

    await consumer.connect();

    await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            const parsed = JSON.parse(message.value.toString());

            const { eventType, data } = parsed;

            switch (eventType) {
                case 'user-registered':
                    console.log(`📧 Send welcome email to ${data.email}`);
                    break;
                case 'user-updated':
                    console.log(`🔁 Send update notification for ${data.email}`);
                    break;
                case 'user-deleted':
                    console.log(`❌ Notify about deletion of ${data.email}`);
                    break;
                default:
                    console.log(`⚠️ Unknown event type: ${eventType}`);
            }
        },
    });
};

run().catch(console.error);
