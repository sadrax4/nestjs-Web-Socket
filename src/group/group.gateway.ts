import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  namespace:"sadra"
})
export class GroupGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
