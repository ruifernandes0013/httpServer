import { HttpMethod } from "../../types"

/**
 * Parses and represents an HTTP request from a raw request string.  
 * Extracts the HTTP method, request path, and headers.  
 * 
 * @property {string} method - The HTTP method (e.g., "GET", "POST").  
 * @property {string} path - The request path (e.g., "/users").  
 * @property {Record<string, string>} headers - The HTTP headers as a key-value object.  
 */
export class HttpRequest {
  public method: HttpMethod = '' as HttpMethod
  public path: string = ''  
  public headers: Record<string, string> = {}

  constructor(request: string) {
    this.parseHttpRequest(request)
  }

  private parseHttpRequest(request: string): void {
    const rawHttpReqLines = request.toString().split('\r\n')
    const [ method, path ] = rawHttpReqLines[0].split(' ')
    this.method = method as HttpMethod
    this.path = path

    rawHttpReqLines.slice(1).forEach((line: string) => {
      const separatorIndex = line.indexOf(':')
      const header = line.substring(0, separatorIndex).trim()
      const headerValue = line.substring(separatorIndex + 1).trim()
      if (header !== '') {
        this.headers[header] = headerValue
      }
    })
  }
}