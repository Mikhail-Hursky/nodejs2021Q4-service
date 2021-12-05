const {
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask,
  } = require('./handlers');
  
  const Task = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      order: { type: 'number' },
      description: { type: 'string' },
      userId: { type: ['string', 'null'], nullable: true },
      boardId: { type: ['string', 'null'], nullable: true },
      columnId: { type: ['string', 'null'], nullable: true },
    },
  }

  const getTasksOpts = {
    schema: {
      response: {
        200: {
          type: 'array',
          boards: Task,
        },
      },
    },
    handler: getTasks,
  }
  
  const getTaskOpts = {
    schema: {
      response: {
        200: Task,
      },
    },
    handler: getTask,
  }
  
  const postTaskOpts = {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'order', 'description', 'userId', 'boardId'],
        properties: {
          title: { type: 'string' },
          order: { type: 'number' },
          description: { type: 'string' },
          userId: { type: ['string', 'null'], nullable: true },
          boardId: { type: ['string', 'null'], nullable: true },
          columnId: { type: ['string', 'null'], nullable: true },
        },
      },
      response: {
        201: Task,
      },
    },
    handler: addTask,
  }
  
  const deleteTaskOpts = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: deleteTask,
  }
  
  const updateTaskOpts = {
    schema: {
      response: {
        200: Task,
      },
    },
    handler: updateTask,
  }
  
  function taskRoutes(fastify, options, done) {
    fastify.get('/boards/:id/tasks', getTasksOpts)
  
    fastify.get('/boards/:id/tasks/:taskId', getTaskOpts)
  
    fastify.post('/boards/:id/tasks', postTaskOpts)
  
    fastify.delete('/boards/:id/tasks/:taskId', deleteTaskOpts)
  
    fastify.put('/boards/:id/tasks/:taskId', updateTaskOpts)
  
    done()
  }
  
  module.exports = taskRoutes