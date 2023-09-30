import {CommonEnums} from "./enums/CommonEnums.ts";

Bun.serve({
    port: 2000,
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url)
        const method = request.method as CommonEnums.MethodsRequest

        if (url.pathname === '/file'){
            if (method === CommonEnums.MethodsRequest.GET){
                return new Response(Bun.file('./file/text.txt'))
            }
            if (method === CommonEnums.MethodsRequest.POST){
                const formData = await request.formData()
                const text = formData.get('text')
                if (!text){
                    return new Response('No text', {status: 400})
                }
                await Bun.write('./file/text.txt', text)
                return new Response('Success')
            }
        }

        if (url.pathname === '/image')  return new Response(Bun.file('./file/images.jpeg'));
        if (url.pathname === '/html')  return new Response(Bun.file('./file/index.html'));
        if (url.pathname === '/') return new Response('Hello I`m Bun server\ni have url:\n /image\n /html');
        return new Response('There is no such request');
    }
})
