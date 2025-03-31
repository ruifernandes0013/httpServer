/**
 * Parses and represents an HTTP response
 */
export class HttpResponse {
  private statusCode: number = 200;
  private headers: Record<string, string> = {};
  private body: string = '';

  constructor(private socket: any) {}

  send(body: any): void {
    this.body = JSON.stringify(body)
    this.writeResponse()
  }

  status(statusCode: number): void {
    this.statusCode = statusCode
  }

  setHeader(header: string, value: string): void {
    this.headers[header] = value
  }

  private writeResponse() {
    const statusMessages = this.getStatusMessage(this.statusCode)
    let res = `HTTP/1.1 ${this.statusCode} ${statusMessages}`
    
    this.headers['Content-Length'] = Buffer.byteLength(this.body).toString();

    for (const key in this.headers) {
      res += `${key}: ${this.headers[key]} \r\n`;
    }

    res += `\r\n${this.body}`;

    console.log('res->', res)
    this.socket.write(res)
    this.socket.end()
  }

  private getStatusMessage(statusCode: number): string {
    const statusMessages: Record<number, string> = {
      200: "OK",
      400: "Bad Request",
      404: "Not Found",
      500: "Internal Server Error"
    }

    return statusMessages[statusCode] || 'unknow status'
  }
}