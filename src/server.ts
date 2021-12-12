import fastify from 'fastify';
import userRoute from './resources/users/routes'
import boardRoute from './resources/boards/routes'
import taskRoute from './resources/tasks/routes'
import config from './common/config';

const app = fastify({ logger: true });

app.register(userRoute);
app.register(boardRoute);
app.register(taskRoute);

const start = async () => {
  try {
    await app.listen(config.PORT)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start();
