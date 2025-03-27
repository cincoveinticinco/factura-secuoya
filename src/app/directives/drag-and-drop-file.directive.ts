import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDragAndDropFile]',
  standalone: true
})
export class DragAndDropFileDirective {

  @Input() allowed_extensions: Array<string> = [];
  @Input() multiple: boolean = false;
  @Output() onChangeFile: EventEmitter<File[]> = new EventEmitter();
  @Output() onInvalidFile: EventEmitter<File[]> = new EventEmitter();

  @HostBinding('style.background') private colorFondo = 'var(--light-box)';
  @HostBinding('style.borderColor') private colorBorde = 'var(--light-border-box)';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.colorFondo = 'var(--background-light-color)';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.colorFondo = 'inherit';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.colorFondo = 'inherit';

    var archivos = this.multiple ? evt.dataTransfer.files : [evt.dataTransfer.files[0]];
    var archivos_validos: Array<File> = [];
    var archivos_invalidos: Array<File> = [];

    if (archivos.length) {
      for (var file of archivos) {
        var ext = file.name.split('.')[file.name.split('.').length - 1];
        if (this.allowed_extensions.lastIndexOf(ext) != -1 || !this.allowed_extensions.length) {
          archivos_validos.push(file);
        } 
        else {
          archivos_invalidos.push(file);
          this.colorFondo = 'var(--background-light-color)';
          this.colorBorde = 'var(--alert-color)';
          setTimeout(() => {
            this.colorFondo = 'inherit';
            this.colorBorde = 'var(--light-border-box)';
          }, 800);
        }
      }
    }
    this.onChangeFile.emit(archivos_validos);
    this.onInvalidFile.emit(archivos_invalidos);
  }
}
