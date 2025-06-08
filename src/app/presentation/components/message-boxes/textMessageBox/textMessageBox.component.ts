import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textMessageBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent {
  @Input() placeholder: string = '';
  @Input() disableCorrections: boolean = false;

  // El onMessage lo emite el hijo al padre.
  @Output() onMesage = new EventEmitter<string>();

  //Definición del formulario reactivo
  // Se utiliza FormBuilder para crear el formulario con un campo 'prompt' que es requerido
  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
 })

 handleSubmit() {
  if ( this.form.invalid) return;
   const { prompt } = this.form.value;
    console.log(`Mensaje enviado por el componente hijo: ${prompt}`);

    // Se hace el envio desde la caja de información al componente padre
    this.onMesage.emit(prompt ?? '');
    this.form.reset();
 }

}
