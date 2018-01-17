import { Observable } from 'rxjs/Observable';
import  *  as io from 'socket.io-client';

export class SocketRxjs {
  private static instance: SocketRxjs;
  private socket;

  private constructor(){
    this.socket = io('http://localhost:3333');
  };
  
  static getInstance() {
    if (!SocketRxjs.instance) {
      SocketRxjs.instance = new SocketRxjs();
    }
    return SocketRxjs.instance;
  }

  onConnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('connect', () => observer.next());
    });
  }

  onDisconnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('disconnect', () => observer.next());
    });
  }

  send(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  onEvent(event: string): Observable<any> {
    return new Observable(observer => {
      if(event== null){
        observer.error("ERROR no event given");
      }
      this.socket.on(event, (data) => { 
        observer.next(data);
      });

    })
  }
}