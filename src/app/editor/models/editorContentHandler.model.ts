import {PartHostDirective} from "../../directives/part-host.directive";
import {ComponentRef, Type} from "@angular/core";
import {ReportContentComponent} from "../../models/reportPartContent";
import {Subject} from "rxjs";

export class EditorContentHandlerModel {
  currentComponentRef: ComponentRef<ReportContentComponent> | null = null;

  createComponent(host: PartHostDirective,
                  componentType: Type<ReportContentComponent>,
                  value: any, index?: number): ComponentRef<ReportContentComponent> {
    const componentRef = host.createComponent(componentType, index);
    componentRef.instance.value = value;
    componentRef.instance.selected = new Subject<boolean>();
    componentRef.instance.selected.subscribe((isSelected) => {
      if (isSelected) {
        console.log("isSelected idx", componentRef);
        this.currentComponentRef = componentRef;
      }
    });
    return componentRef;
  }

  getIndex(host: PartHostDirective, componentRef: ComponentRef<ReportContentComponent>) {
    return host.viewContainerRef.indexOf(componentRef.hostView);
  }

  splitComponent(host: PartHostDirective, componentRef: ComponentRef<ReportContentComponent>): ComponentRef<ReportContentComponent>[] {
    const idx = this.getIndex(host, componentRef);
    console.log("splitComponent idx", idx);
    const value = componentRef.instance.value;
    const caret = componentRef.instance.caret[1];
    if (caret === value.length) {
      return [componentRef];
    }
    const valueBefore = value.slice(0, caret - 1);
    const valueAfter = value.slice(caret - 1, value.length);
    host.viewContainerRef.remove(idx);
    const ref1 = this.createComponent(host, componentRef.componentType, valueBefore, idx);
    const ref2 = this.createComponent(host, componentRef.componentType, valueAfter, idx + 1);
    return [ref1, ref2];
  }

}
