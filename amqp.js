const amqpClient = require('./amqpClient')

channel = async () => {
  return await amqpClient.createClient({ url: 'amqp://localhost:5672' })
}

module.exports = {
  amqpClient,
  channel: channel()
}

