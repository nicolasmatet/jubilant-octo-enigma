import {PartHostDirective} from "../../directives/part-host.directive";
import {EditorContentHandlerModel} from "../models/editorContentHandler.model";

export interface EditorContextMenuData {
  host: PartHostDirective,
  contentHandler: EditorContentHandlerModel
}
