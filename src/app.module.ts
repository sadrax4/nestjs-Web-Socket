import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessageModule,
    GroupModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
