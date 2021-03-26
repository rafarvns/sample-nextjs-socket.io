import { Logger, Res } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  private _logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this._logger.log('Initialized!');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, json: any): WsResponse<any> {
    this._logger.log('Socket recebido! ' + json.data + ' | ' + client.id);
    return {
      event: 'messageToClient',
      data: 'Tome essa resposta aê!'
    };
  }

  handleConnection(client: Socket, ...args: any[]) {
    this._logger.log('Conectado: ' + client.id);
  }

  handleDisconnect(client: Socket) {
    this._logger.log('Desconectado: ' + client.id);
  }

}
