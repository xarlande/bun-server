import {Server} from "bun";

Bun.serve({
    port: 2000,
    fetch(request: Request, server: Server): Response | Promise<Response> {
        const url = new URL(request.url)
        if (url.pathname === '/image')  return new Response(Bun.file('./file/images.jpeg'));
        if (url.pathname === '/html')  return new Response(Bun.file('./file/index.html'));
        return new Response('Hello I`m Bun server\ni have url:\n /image\n /html');
    }
})
