import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { PlayScoreService } from './play-score.service';

const CHAT_URL = "ws://192.168.56.1:5220/";

export interface Message {
  author: string;
  message: string;
}


@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: PlayScoreService) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      }
    );
  }

}
