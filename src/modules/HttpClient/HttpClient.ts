import * as net from 'net'
import { 
  HttpMethod, 
  HttpMethodEnum, 
  IHttpClient, 
  RequestHandler, 
  ServerOptions 
} from './types'
import { HttpRequest } from '../HttpRequest/HttpRequest';
import { HttpResponse } from '../HttpResponse/HttpResponse';

const serverOptions: ServerOptions = {
  connection: 'connection',
  data: 'data',
  end: 'end',
  error: 'error'
};

export class HttpClient implements IHttpClient{
  private routes: Record<string, RequestHandler[]> = {}

  private addRoute(method: HttpMethod, path: string, callback: RequestHandler) {
    const routeKey = this.getRouteKey(method, path)
    if(!this.routes[routeKey]) {
      this.routes[routeKey] = []
    }
    this.routes[routeKey].push(callback)
  }

  private getRouteKey(method: HttpMethod, path: string): string {
    return `${method} ${path}`
  }

  private handleRequest(params: any): void {
    const { sock, request } = params

    const req = new HttpRequest(request)
    const res = new HttpResponse(sock)
    
    const routeKey = this.getRouteKey(req.method, req.path)
    const callbacks = this.routes[routeKey]

    if (callbacks?.length) {
      let index = 0;

      const next = () => {
        const callback = callbacks[index++];
        if (callback) {
          callback(req, res, next); 
        }
      };

      next(); 
    } else {
      console.log(`No route found for ${req.method} ${req.path}`);
    }
  }

  /**
   * Deletes http client
   * @param url 
   * @param callback 
   */
  delete(url: string, callback: RequestHandler): void {
    this.addRoute(HttpMethodEnum.DELETE, url, callback)
  }

  /**
    * Gets http client
    * @param url 
    * @param callback 
    */
  get(url: string, callback: RequestHandler): void {
    this.addRoute(HttpMethodEnum.GET, url, callback)
  }
  
  /**
   * Patchs http client
   * @param url 
   * @param callback 
   */
  patch(url: string, callback: RequestHandler): void {
    this.addRoute(HttpMethodEnum.PATCH, url, callback)
  }

  /**
   * Puts http client
   * @param url 
   * @param callback 
   */
  put(url: string, callback: RequestHandler): void {
    this.addRoute(HttpMethodEnum.PUT, url, callback)
  }

  /**
   * Posts http client
   * @param url 
   * @param callback 
   */
  post(url: string, callback: RequestHandler): void {
    this.addRoute(HttpMethodEnum.POST, url, callback)
  }

  /**
   * Listens http client
   * @param port 
   * @param [callback] 
   */
  listen(port: number, callback?: () => void): void {
    const server = net.createServer();
    server.on(serverOptions.connection, (sock: any) => {
      sock.on(
        serverOptions.data, 
        (request: any) => this.handleRequest({ sock, request})
      );
      
      // sock.on(serverOptions.end, closeConnection);
      sock.on(serverOptions.error, (error: Error) => {
        console.log('error:', error)
        process.exit(1)
      });
    });

    
    server.listen(port, callback ? callback : () => {
      console.log(`HTTP server running on port ${port} routes: `, this.routes)
    })
  }
}