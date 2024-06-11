import express, { Express, Request, Response } from "express";

const App: Express = express();
const port: Number = 9090;


// CREATE
App.post('/tasks', (req: Request, res: Response) => {
});

// READ
App.get('/tasks');

//UPDATE
//App.put('/tasks/:id');

//DELETE
//App.delete('/tasks/:id');

App.listen(port, () => console.log(`http://localhost:${port}`));