import { ObjectId } from "https://deno.land/x/mongo/mod.ts";

import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getDB } from '../helpers/db_client.ts';

const router = new Router();

interface Todo {
    id?: string;
    text: string;
}

router.get('/todos', async ctx => {
    const todos = await getDB().collection('todos').find().toArray();
    
    const transformedTodos = todos.map(todo => {
        return { id: todo._id.toString(), text: todo.text };
    });
    
    ctx.response.body = { todos: transformedTodos };
});

router.post('/todos', async ctx => {
    const data = await ctx.request.body.json();
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: data.text
    };
    const id = await getDB().collection('todos').insertOne(newTodo);
    newTodo.id = id.toString();
    ctx.response.body = {
        message: 'Created TODO!',
        todo: newTodo
    }
});

router.put('/todos/:todoId', async ctx => {
    const id = ctx.params.todoId!;
    const data = await ctx.request.body.json();
    
    const t = await getDB()
        .collection('todos')
        .updateOne({ _id: new ObjectId(id) }, { 
            $set: {
                text: data.text
            }
        });        

    ctx.response.body = { message: 'Updated TODO!' };
});

router.delete('/todos/:todoId', async ctx => {
    const id = ctx.params.todoId!;
        
    await getDB()
        .collection('todos')
        .deleteOne({ _id: new ObjectId(id) });

    ctx.response.body = { message: 'Deleted TODO!' };
});

export default router;