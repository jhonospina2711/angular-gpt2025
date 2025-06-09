import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TextMessageEvent {
  file: File;
  prompt?: string | null;
}

@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textMessageBoxFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {
  @Input() placeholder: string = '';

  // El onMessage lo emite el hijo al padre.
  @Output() onMesage = new EventEmitter<TextMessageEvent>();

  //Definición del formulario reactivo
  // Se utiliza FormBuilder para crear el formulario con un campo 'prompt' que es requerido
  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [],
    file: [null, Validators.required]
 });

 public file: File | undefined;


 // Permite manejar el evento de selección de archivo
 handleSelectedFile(event: any) {
  const file = event.target.files.item(0);
  this.form.controls.file.setValue(file);
 }

 // Permite manejar el evento de cambio para el componente hijo txtMessageBox
 handleSubmit() {
  if ( this.form.invalid) return;
   const { prompt, file } = this.form.value;
    // console.log(`Mensaje enviado por el componente hijo: ${prompt}`);

    // Se hace el envio desde la caja de información al componente padre
    this.onMesage.emit({prompt, file: file!});
    this.form.reset();
 }

}
