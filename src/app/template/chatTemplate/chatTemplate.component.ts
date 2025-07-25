import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAiService } from 'app/presentation/services/openai.service';


@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,

  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public OpenAiService = inject( OpenAiService);

  handleMessage( prompt: string ) {
    console.log( `Mensaje recibido por el componente padre Orthography: ${prompt}` );
  }

  // handleMessageWithFile( {prompt, file }: TextMessageEvent ) {
  //   console.log( {prompt, file} );

  // }

  // handleMessageWithFileSelect( event: TextMessageBoxEvent) {
  //   console.log(event);
  // }
 }
