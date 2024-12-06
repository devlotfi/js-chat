import { Module } from '@nestjs/common';
import { WsSessionService } from './ws-session.service';
import { WsSessionGateway } from './ws-session.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [WsSessionService, WsSessionGateway],
})
export class WsSessionModule {}
