//https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md
import { SocketRxjs } from './../libs/socket.rxjs';
import { of } from 'rxjs/observable/of';
import { tap, filter, map }  from 'rxjs/operators';

export class SocketReactiveFive {

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
    const source$ = this.io.onEvent("edge_communication");
    source$.pipe(
      filter(this.getTeam),
      map((data)=>data.members)
    )
    .subscribe(this.onSuccessNext, this.onError, this.onCompleted)
    console.log('continue')
  }

  connect(){
    const  source$ = this.io.onConnect();    
    source$.pipe(tap(()=>this.listenToChangeOutput()))
    .subscribe(() => {
       console.log('connected');
    })
  }
}
