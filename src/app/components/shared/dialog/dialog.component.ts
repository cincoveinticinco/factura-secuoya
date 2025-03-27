import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  @Input() title: string = '';
	@Input() type = 'confirmation';
	@Input() item: string = '';
	@Input() message: string = '';
	@Input() translateItem: boolean = true;
	@Input() closeOnContainer: boolean = true;
	@Input() cancelText: string = 'Cancelar';
	@Input() confirmText: string = 'Confirmar';

	@Output() closeModal = new EventEmitter<string>();
	@Output() cancelModal = new EventEmitter<string>();
	@Output() confirmModal = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

	containerClose() {
		if (!this.closeOnContainer) return;
		this.close();
	}

	close() {
		this.closeModal.emit()
	}
	confirm() {
		this.confirmModal.emit()
	}
	cancel() {
		this.cancelModal.emit()
	}
}
