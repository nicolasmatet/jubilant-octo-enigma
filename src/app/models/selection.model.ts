import {Subject} from "rxjs";

export abstract class SelectionModel<T> {

  abstract selectionChange: Subject<T[]>;

  abstract select(value: T): void;
  abstract unselect(value: T): void;
  abstract clear(): void;

}
