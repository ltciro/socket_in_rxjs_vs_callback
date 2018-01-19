import { SocketCb } from './controllers/socket-cb.controller'
import { SocketReactive } from './controllers/socket-reactive.controller'
import { SocketReactiveFive } from './controllers/socket-reactive-five.controller'

const socketCb = new SocketCb();
const socketReactive = new SocketReactive();
const socketReactiveFive = new SocketReactiveFive();

socketCb.connect();

//socketReactive.connect();
//socketReactiveFive.connect();