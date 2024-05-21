import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';


export class RedisIoAdapter extends IoAdapter {
  constructor(
    app,
    private configService: ConfigService
  ) {
    super(app)
  }
  private adapterConstructor: ReturnType<typeof createAdapter>;
  async connectToRedis(): Promise<void> {
    try {
      const pubClient = createClient({ url: this.configService.get<string>("REDIS_URL") });
      const subClient = pubClient.duplicate();
      await Promise.all([pubClient.connect(), subClient.connect()]);
      this.adapterConstructor = createAdapter(pubClient, subClient);
      Logger.log("[InstanceLoader] Redis dependencies initialized");
    } catch (error) {
      Logger.error("Can Not Connect to Redis")
    }
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}