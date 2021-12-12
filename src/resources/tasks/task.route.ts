import {FastifyInstance } from "fastify";

import fp from "fastify-plugin";
import * as memory from "../memory.repository"

/**
 * A wrapper to add routes to an instance of Fastify
 * @param app an instance of Fastyfy
 * @returns void
 */
async function taskRoutes(app: FastifyInstance) {
    app.get<{
        Params: {
            boardId: string
        }
    }>('/boards/:boardId/tasks', async (req) => {
        const {boardId} = req.params;
        return memory.getAllTasks(boardId);
    });
    app.get<{
        Params: {
            id: string,
            boardId: string

        }
    }>('/boards/:boardId/tasks/:id', async (req, res) => {
        const task = memory.getTaskById(req.params.id, req.params.boardId);
        if (!task) {
            res.statusCode = 404;
            return false;
        }
        return task;
    });
    app.post<{
        Body: {
            title: string,
            order: string,
            description: string,
            userId: string,
            boardId: string,
            columnId: string,

        },
        Params: {
            boardId: string
        }
    }>('/boards/:boardId/tasks', async (req, res) => {
        const {
            title, order,
            description,
            userId,
            columnId
        } = req.body;
        const {boardId} = req.params;
        const task = memory.createNewTask(
            title,
            order,
            description,
            userId,
            boardId,
            columnId
        );
        if (task !== undefined) res.statusCode = 201;
        return task;
    });
    app.delete<{
        Params: {
            id: string,
            boardId: string

        }
    }>('/boards/:boardId/tasks/:id', async (req, res) => {
        const result = memory.deleteTaskById(req.params.id, req.params.boardId);
        if (!result) {
            res.statusCode = 404;
            return false;
        }
        return true;
    });
    app.put<{
        Params: {
            id: string
        },
        Body: {
            title: string,
            order: string,
            description: string,
            userId: string,
            boardId: string,
            columnId: string
        }
    }>('/boards/:boardId/tasks/:id', async (req, res) => {
        const {id} = req.params;
        const {title,
            order,
            description,
            userId,
            boardId,
            columnId} = req.body;
        const task = memory.updateTaskById(
            id,
            title,
            order,
            description,
            userId,
            boardId,
            columnId
        );
        if (!task) {
            res.statusCode = 404;
            return false;
        }
        return task;
    });

    
}

export default fp(taskRoutes);
