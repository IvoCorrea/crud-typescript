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
        return res.status(201).json({
            message: "Your task has been created"
        });
    }
    catch (err) {
        res.status(500).json({
            message: `Internal Error: ${err}`
        })
    };

});

// READ
App.get('/tasks', async (req: Request, res: Response) => {
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
            where: { id: id }
        });

        return res.status(200).json(tasks);
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            error: `Internal Error: ${err}`
        })
    };
});
//UPDATE
App.put('/tasks', async (req: Request, res: Response) => {
    const tasksBody = z.object({
        id: z.string().transform((val) => parseInt(val, 10)),
        status: z.string()
    })
    const { id, status } = tasksBody.parse(req.body)

    try {
        await prisma.task.update({
            where: { id: id },
            data: {
                status
            }
        });

        return res.json({
            message: "Your task has been updated"
        });
    }
    catch (err) {
        console.error(err);
        return res.json({
            error: `Internal Error: ${err}`
        });
    };
});

//DELETE
App.delete('/tasks', async (req: Request, res: Response) => {
    const taskBody = z.object({
        title: z.string()
    });
    const { title } = taskBody.parse(req.body);

    try {
        await prisma.task.deleteMany({
            where: {title: title},
        });

        return res.status(200).json({
            message: "Your task has been deleted"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: `Internal Error: ${err}`
        })
    };
});

App.listen(port, () => console.log(`http://localhost:${port}`));