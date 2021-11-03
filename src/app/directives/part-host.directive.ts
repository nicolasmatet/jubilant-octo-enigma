import {ComponentFactoryResolver, ComponentRef, Directive, Renderer2, Type, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPartHost]'
})
export class PartHostDirective {

  constructor(public viewContainerRef: ViewContainerRef,
              private renderer: Renderer2,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }


  public createComponent<T>(component: Type<T>, index?: number): ComponentRef<T> {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    return this.viewContainerRef.createComponent(factory, index);
  }

  public delete(index: number): void {
    return this.viewContainerRef.remove(index);
  }
}
