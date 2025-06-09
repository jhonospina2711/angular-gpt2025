import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Option {
  id: string;
  text: string;
}

export interface TextMessageBoxEvent {
  prompt: string;
  selectedOption: String;
}

@Component({
  selector: 'app-text-message-box-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './textMessageBoxSelect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent {
  @Input() placeholder: string = '';
  @Input({required: true}) options!: Option[];
  // El onMessage lo emite el hijo al padre.
  @Output() onMesage = new EventEmitter<TextMessageBoxEvent>();

  // Definición del formulario reactivo
  // Se utiliza FormBuilder para crear el formulario con un campo 'prompt' que es requerido
  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOption: ['', Validators.required],
  })

  handleSubmit() {
    if (this.form.invalid) return;
    const { prompt, selectedOption } = this.form.value;

    // Se hace el envio desde la caja de información al componente padre
    this.onMesage.emit( { prompt: prompt!, selectedOption: selectedOption! });;
    this.form.reset();
  }
}
