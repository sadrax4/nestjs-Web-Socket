import { Module } from '@nestjs/common';
import { GroupGateway } from './group.gateway';

@Module({
  providers: [GroupGateway]
})
export class GroupModule {}
