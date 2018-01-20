import { SocketRxjs } from './../libs/socket.rxjs';
import  "rxjs/add/operator/do";
import  "rxjs/add/operator/filter";
import  "rxjs/add/operator/map";
import  "rxjs/add/operator/catch";
import  "rxjs/add/observable/of";

export class SocketReactive {

  private io:SocketRxjs;

  constructor() {
    this.io = SocketRxjs.getInstance();
  }

  getTeam(data) {
    return data.team == "rogue"
  }

  onError(err){
    console.log("onError",err);
  }

  onSuccessNext(data){
    console.log(data);
  }

  onCompleted(){
    console.log('completed')
  }


  listenToChangeOutput():void {
    this.io.onEvent("edge_communication")
    .filter(this.getTeam)
    .map((data)=>data.members)
    .subscribe(this.onSuccessNext, this.onError, this.onCompleted)
    console.log('continue')
  }

  connect(){
    this.io.onConnect()
    .do(()=>this.listenToChangeOutput())
    .subscribe(() => {
       console.log('connected');
    })
  }
}
