import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPartHost]'
})
export class PartHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
