import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [ChatModule, VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
