export interface ContextMenuItem<T> {
  title: string;
  icon: string;
  callback: (menuData: T) => void
}
