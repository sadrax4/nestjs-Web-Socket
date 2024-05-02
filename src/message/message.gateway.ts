import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Socket } from 'net';
import { Server } from "socket.io"
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: "*",
})
export class MessageGateway implements OnModuleInit {
  constructor(private readonly messageService: MessageService) { }

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', socket => {
      console.log(socket.id)
      console.log("connected")
      socket.on('message', data => {
        console.log('Received message:', data);
      });
      socket.on('')
      socket.on('disconnect', () => {
        console.log('disconnected');
      });
    })

  }

  @SubscribeMessage('send_message')
  create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket
  ) {
    client.on("connect", () => {
      console.log("client connect")
    })
    this.server.emit('chat', createMessageDto)
    return this.messageService.create(createMessageDto);
  }

  @SubscribeMessage('')
  findAll() {
    return this.messageService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messageService.remove(id);
  }
}
