import express, { Express, Request, Response } from "express";
import z from "zod";
import { PrismaClient } from '@prisma/client';

const App: Express = express();
const prisma = new PrismaClient();
const port: Number = 9090;

App.use(express.json())

// CREATE
App.post('/tasks', async (req: Request, res: Response) => {

    const createTasksBody = z.object({
        title: z.string(),
        description: z.string(),
        status: z.string(),
        duedate: z.string().datetime()
    });
    const { title, description, status, duedate } = createTasksBody.parse(req.body)

    try {
        await prisma.task.create({
            data: {
                title,
                description,
                status,
                duedate
            }
        });
        return res.status(201).send('your task has been created')
    }
    catch (err) {
        res.status(500).send('Db error')
    };

});

// READ
App.get('/tasks', async (res: Response) => {
    const tasks = await prisma.task.findMany();

    res.status(200).json(tasks);
});

// READ
App.get('/tasks/:id', async (req: Request, res: Response) => {
    const taskParams = z.object({
        id: z.string().transform((val) => parseInt(val, 10))
    });
    const { id } = taskParams.parse(req.params);

    try {
        const tasks = await prisma.task.findUnique({
            where: {id: id}
        });

        res.json(tasks);
    } 
    catch (err) {
        console.error(err)
    };
});
//UPDATE
//App.put('/tasks/:id');

//DELETE
//App.delete('/tasks/:id');

App.listen(port, () => console.log(`http://localhost:${port}`));