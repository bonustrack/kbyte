let WebSocket;
if (typeof window !== 'undefined') {
  // @ts-ignore
  WebSocket = window.WebSocket;
} else {
  WebSocket = require('ws');
}

const wait = (ws, cb) => {
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
  private open: boolean;
  private readonly queue: object;
  private notifications: any;
  private readonly ws: any;

  constructor(address) {
    this.address = address;
    this.open = false;
    this.queue = {};
    this.notifications = () => {};

    this.ws = new WebSocket(address);

    this.ws.addEventListener('message', (data) => {
      const message = JSON.parse(data.data);
      if (this.queue[message[1].tag]) {
        const error = message[1].response.error || null;
        const result = error ? null : message[1].response;
        this.queue[message[1].tag](error, result);
      } else {
        this.notifications(message);
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
    this.notifications = cb;
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

  justsaying(subject: string, body?: any) {
    const justsaying = { subject, body };
    this.send(['justsaying', justsaying]);
  }
}
