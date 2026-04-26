// services/websocketService.js

class WebSocketService {
    constructor() {
        this.socket = null;
        this.userId = null;
        this.handlers = {
            'new_message': [],
            'user_typing': [],
            'online_users': []
        };
    }

    connect(userId) {
        this.userId = userId;
        return new Promise((resolve, reject) => {
            const wsUrl = `ws://localhost:8080`;
            this.socket = new WebSocket(wsUrl);
            this.socket.onopen = () => {

                setTimeout(() => {
                    this.socket.send(JSON.stringify({
                        type: 'auth',
                        user_id: userId
                    }));
                    resolve();
                }, 0);

            };

            this.socket.onmessage = (event) => this.handleMessage(event.data);
            this.socket.onerror = (error) => reject(error);
            this.socket.onclose = () => console.log('Disconnected');
        });
    }

    handleMessage(rawData) {
        const data = JSON.parse(rawData);

        if (this.handlers[data.type]) {
            this.handlers[data.type].forEach(cb => cb(data));
        }
    }

    sendMessage(senderId, receiverId, message) {
        this.socket.send(JSON.stringify({
            type: 'message',
            sender_id: senderId,
            receiver_id: receiverId,
            message: message
        }));
    }

    sendTyping(senderId, receiverId, isTyping) {
        this.socket.send(JSON.stringify({
            type: 'typing',
            sender_id: senderId,
            receiver_id: receiverId,
            is_typing: isTyping
        }));
    }

    updateStatus(isOnline) {
        this.socket.send(JSON.stringify({
            type: 'status',
            is_online: isOnline
        }));
    }

    on(event, callback) {
        if (this.handlers[event]) {
            this.handlers[event].push(callback);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

export default new WebSocketService();