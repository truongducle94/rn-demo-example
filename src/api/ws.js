WEBSOCKET_UAT = 'ws://10.1.16.211:10161/websocket'
WEBSOCKET_ME = 'ws://104.131.59.229:3000/websocket'
class WS {
    static init() {
        console.log('init ws')
        this.ws = new WebSocket(WEBSOCKET_UAT)
    }
    static onMessage(handler) {
        this.ws.addEventListener('message', handler);
    }
    static sendMessage(message) {
        // You can have some transformers here.
        // Object to JSON or something else...
        this.ws.send(message);
    }
}

export default WS