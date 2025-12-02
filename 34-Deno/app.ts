// Deno support JS/TS.
// Support URL imports and modern JS feature like Promises.
// Secured by default and requires explicit execution permissions.

// Deno.serve({
//     port: 3000
// }, (_req) => {
//     return new Response('New Response');
// });

import { Application } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();

app.use((ctx) => {
    ctx.response.body = 'Hello world!';
});

await app.listen({ port: 3000 });