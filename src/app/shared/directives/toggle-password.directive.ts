import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'toggle'
})

export class TogglePasswordDirective {
  constructor(private el: ElementRef) { }
  @HostBinding('attr.type') type: string = 'password';
    
  @HostListener('click') toggleType() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }
}
