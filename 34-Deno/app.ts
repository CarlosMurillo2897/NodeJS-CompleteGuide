// Deno support JS/TS.
// Support URL imports and modern JS feature like Promises.
// Secured by default and requires explicit execution permissions.

let text = 'This is a test -- and it should be stored in a file!';

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile('message.txt', data).then(_ => {
    console.log('Wrote to a file');
});