import fastify from 'fastify';
import userRoute from './resources/user/user.route'
import boardRoute from './resources/board/board.route'
import taskRoute from './resources/task/task.route'
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
