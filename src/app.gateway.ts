import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  private _logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this._logger.log('Initialized!');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return {
      event: 'messageToClient',
      data: 'Hello World!'
    };
  }

  handleConnection(client: Socket, ...args: any[]) {
    this._logger.log('Connected: ' + client.id);
  }

  handleDisconnect(client: Socket) {
    this._logger.log('Disconnected: ' + client.id);
  }

}
