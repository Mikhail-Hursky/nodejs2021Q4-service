const fastify = require('fastify')({ logger: true })
const { PORT } = require('./common/config');

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
})

fastify.register(require('./resources/users/routes'));
fastify.register(require('./resources/boards/routes'));
fastify.register(require('./resources/tasks/routes'));

const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start();