import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessageModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
