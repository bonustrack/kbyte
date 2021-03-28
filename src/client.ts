let WebSocket;
if (typeof window !== 'undefined') {
  // @ts-ignore
  WebSocket = window.WebSocket;
} else {
  WebSocket = require('ws');
}

const wait = (ws: WebSocket, cb) => {
  setTimeout(() => {
    if (ws.readyState === 1) {
      if (cb !== null) cb();
    } else {
      wait(ws, cb);
    }
  }, 5);
};

export default class Client {
  private readonly address: string;
  private readonly ws: WebSocket;
  private readonly queue: object;
  private notifications: any;
  private open: boolean;

  constructor(address: string) {
    this.address = address;
    this.ws = new WebSocket(address);
    this.queue = {};
    this.notifications = [];
    this.open = false;

    this.ws.addEventListener('message', (payload) => {
      const message = JSON.parse(payload.data);
      if (!message || !Array.isArray(message) || message.length !== 2) return;
      if (this.queue[message[1].tag]) {
        const error = message[1].response.error || null;
        const result = error ? null : message[1].response;
        const callback = this.queue[message[1].tag];
        delete this.queue[message[1].tag]; // cleanup
        callback(error, result);
      } else {
        this.notifications.forEach(n => n(message));
      }
    });

    this.ws.addEventListener('open', () => {
      this.open = true;
    });

    this.ws.addEventListener('close', () => {
      this.open = false;
    });
  }

  subscribe(cb) {
    this.notifications.push(cb);
  }

  send(message) {
    wait(this.ws, () => {
      this.ws.send(JSON.stringify(message));
    });
  }

  request(command: string, params: any, cb?) {
    const tag = Math.random().toString(36).substring(7);
    const request = { command, params, tag };
    this.queue[request.tag] = cb;
    this.send(['request', request]);
  }

  respond(command: string, tag: string, message?) {
    const respond = { command, tag };
    if (typeof message !== 'undefined') respond['response'] = message;
    this.send(['response', respond]);
  }

  error(command: string, tag: string, message: string) {
    this.respond(command, tag, { error: message });
  }

  justsaying(subject: string, body?: any) {
    const justsaying = { subject, body };
    this.send(['justsaying', justsaying]);
  }
}
