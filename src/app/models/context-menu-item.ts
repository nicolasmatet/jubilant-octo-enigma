export interface ContextMenuItem {
  title: string;
  icon: string;
  callback: (...args: any[]) => void
}
