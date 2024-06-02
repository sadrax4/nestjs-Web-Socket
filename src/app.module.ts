import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessageModule,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
