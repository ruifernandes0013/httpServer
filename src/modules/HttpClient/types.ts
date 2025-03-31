export type RequestHandler = (req: any, res: any, next: () => void) => void;

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export enum HttpMethodEnum {
  GET = 'GET' ,
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

export interface IHttpClient {
  listen(port: number, callback?: () => void): void
  post(url: string, callback: RequestHandler): void
  get(url: string, callback: RequestHandler): void
  patch(url: string, callback: RequestHandler): void
  put(url: string, callback: RequestHandler): void
  delete(url: string, callback: RequestHandler): void
}

export interface ServerOptions {
  connection: string
  data: string
  end: string
  error: string
}