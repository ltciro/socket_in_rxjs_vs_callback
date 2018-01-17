import  *  as io from 'socket.io-client';

export class SocketCalllback {
  private static instance: SocketCalllback ;
  private socket 
  private constructor(){
    this.socket = io('http://localhost:3333');
  };
  static getInstance() {
    if (!SocketCalllback.instance) {
      SocketCalllback.instance = new SocketCalllback();
    }
    return SocketCalllback.instance;
  }

  onConnect(cb) {
    this.socket.on('connect', cb);
  }

  onDisconnect(cb) {
    this.socket.on('disconnect', cb);
  }

  send(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  onEvent(event: string, cb){ 
    if(event == null){
      cb("ERROR no event given");
      return
    }
    this.socket.on(event, (data) => {
      cb(null,data);
    });
  }
}