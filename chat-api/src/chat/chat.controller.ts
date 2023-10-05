import { Body, Controller, Post, Sse } from '@nestjs/common';
import { Observable, Subject, map } from 'rxjs';
import { ChatMessage } from './chat.interface';

@Controller('chat')
export class ChatController {
  messages$: Subject<ChatMessage>;

  constructor() {
    this.messages$ = new Subject<ChatMessage>();
  }

  @Sse('messages')
  sse(): Observable<string> {
    try {
      return this.messages$
        .asObservable()
        .pipe(map((message) => JSON.stringify(message)));
    } catch (error) {
      console.log({ error });
    }
  }

  @Post()
  send(@Body() payload: ChatMessage) {
    // console.log(payload);
    this.messages$.next(payload);
  }
}
