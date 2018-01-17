import { SocketCb } from './controllers/socket-cb.controller'
import { SocketReactive } from './controllers/socket-reactive.controller'

const socketCb = new SocketCb();
const socketReactive = new SocketReactive();

//socketCb.connect();

socketReactive.connect();