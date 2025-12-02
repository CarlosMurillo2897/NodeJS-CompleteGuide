import { Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

interface Todo {
    id: string;
    text: string;
}

let todos: Todo[] = [];

router.get('/todos', ctx => {
    ctx.response.body = { todos };
});

router.post('/todos', async ctx => {
    const data = await ctx.request.body.json();
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: data.text
    };
    todos.push(newTodo);

    ctx.response.body = {
        message: 'Created TODO!',
        todo: newTodo
    }
});

router.put('/todos/:todoId', async ctx => {
    const id = ctx.params.todoId;
    const data = await ctx.request.body.json();
    const todoIndex = todos.findIndex(todo => {
        return todo.id === id;
    });
    todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };
    ctx.response.body = { message: 'Updated TODO!' };
});

router.delete('/todos/:todoId', ctx => {
    const id = ctx.params.todoId;
    todos = todos.filter(todo => todo.id !== id);
    ctx.response.body = { message: 'Deleted TODO!' };
});

export default router;