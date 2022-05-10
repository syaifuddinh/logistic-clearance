const EventEmitter = {
  events: {},
  dispatch(event: any, data: any) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  },
  subscribe(event: any, callback: (data: any) => any) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  unsubscribe(event: any) {
    if (!this.events[event]) return;
    delete this.events[event];
  }
};

export default EventEmitter;
