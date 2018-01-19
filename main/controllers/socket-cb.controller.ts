
import { SocketCalllback } from '../libs/socket.callback';
export class SocketCb {

  private io:SocketCalllback;

  constructor() {
    this.io = SocketCalllback.getInstance();
  }

  getTeam(data,cb):void {
    if(data.team != "rogue"){
      cb("ERROR you're lost, this isn't your team")
      return
    }
    setTimeout(() =>cb(null,data.members),300)
  }
  
  getMembers(err, members){
    if(err){
      console.log(err);
      return
    }
    console.log(members);
  }

  listenToChangeOutput():void {
    this.io.onEvent("edge_communication",
      (err,data) => {
        if(err) {
          console.log(err)
          return;
        }
        this.getTeam(data,(err, members) => this.getMembers(err,members));
        console.log("continue");
      }
    )
  }
  
  connect(){
    this.io.onConnect(() => {
       console.log('connected')
       this.listenToChangeOutput()
    })
  }
}