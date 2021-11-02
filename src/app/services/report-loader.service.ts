import {Injectable} from '@angular/core';
import {Section} from "../models/section";
import {Paragraph} from "../models/paragraph.model";
import {ReportRoot} from "../models/reportPart.model";
import {TagService} from "./tag.service";
import {ReportPartContent} from "../models/reportPartContent";
import {EditorVariableComponent} from "../editor/editor-variable/editor-variable.component";
import {EditorTextComponent} from "../editor/editor-text/editor-text.component";

@Injectable({
  providedIn: 'root'
})
export class ReportLoaderService {

  constructor(private tagService: TagService) {
  }

  getParagraph(text: string): ReportPartContent {
    return {
      component: EditorTextComponent,
      value: text
    };
  }

  getVariable(tag: string, varName: string) {
    return {
      component: EditorVariableComponent,
      value: {tag: tag, varName: varName}
    };
  }

  getReport(): ReportRoot {
    const root = new ReportRoot();
    const pIntro = new Paragraph('Paragraphe Intro');
    const section1 = new Section('Section 1');
    const pA = new Paragraph('Paragraphe A');
    const subSection = new Section('SubSection 1.1');
    const pB = new Paragraph('Paragraphe B');
    const pC = new Paragraph('Paragraphe C');

    pIntro.content = [
      this.getParagraph('Sed mollis hendrerit lorem, vel aliquet justo ullamcorper vel. Nulla facilisi. Pellentesque ac risus neque. ' +
        'Donec ultrices justo vel purus egestas'),
      this.getVariable('France', 'PBT'),
      this.getParagraph('nec luctus lorem auctor. Fusce et risus non nsi ornare fermentum. Sed ' +
        'urna nulla, lacinia id mollis eu, dignissim eu metus. Pellentesque cursus dignissim nisi sit amet mollis. ' +
        'Etiam a eleifend mi. Integer et lectus nec lacus finibus vehicula.')
    ];
    pA.content = [this.getParagraph('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et' +
      ' dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
      'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum')];
    pB.content = [this.getParagraph('Vivamus ante leo, tristique in magna ac, egestas pellentesque dolor. Proin vitae magna a odio bibendum' +
      ' vehicula. Vestibulum semper luctus sem vel mollis. Duis quis tellus vel nunc interdum ultricies. Proin ' +
      'ullamcorper mauris vel nisi viverra venenatis. Quisque congue diam a accumsan pharetra. In id consequat nulla, ' +
      'vel euismod nisl. Nullam tempus sem eu mi semper, et dignissim eros posuere. Sed ut gravida leo, ut egestas eros.' +
      ' Mauris ornare tincidunt viverra. Aliquam vitae nunc massa.\n Cras rutrum arcu eget tellus congue ultricies. ' +
      'Aenean ut lectus orci. In hac habitasse platea dictumst. Phasellus at cursus justo. Ut a consequat ante. ' +
      'Morbi ex felis, maximus et molestie at, ultrices eu tortor. Sed malesuada sem at rutrum rhoncus. Nullam tempor ' +
      'tellus velit, eget tempor urna pharetra in. Ut dignissim ultricies ipsum, in venenatis magna faucibus eget.\n' +
      'Vivamus aliquam lacus tempor sollicitudin posuere. Proin efficitur sem eget nisl consectetur aliquet. Vestibulum ' +
      'a magna eget eros convallis varius non a elit. Proin ac imperdiet diam. Proin sit amet felis a leo interdum ' +
      'convallis. Quisque vel elit quis quam consequat eleifend. Nam molestie pharetra sem eget ultrices. Integer ' +
      'eleifend odio quis orci fermentum feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada ' +
      'fames ac turpis egestas.')];
    pC.content = [this.getParagraph('Vivamus non mauris sed tellus sodales tincidunt quis et ligula. Quisque sed tortor dolor. In posuere ' +
      'viverra aliquet. Maecenas sit amet placerat massa. Nunc vehicula sapien a nisi tempus, a ultricies urna suscipit.' +
      ' Quisque lobortis sapien vehicula, vehicula lacus sed venenatis leo. Mauris ultrices nisi eu venenatis lobortis.' +
      ' Sed mollis hendrerit lorem, vel aliquet justo ullamcorper vel. Nulla facilisi. Pellentesque ac risus neque. ' +
      'Donec ultrices justo vel purus egestas, nec luctus lorem auctor. Fusce et risus non nisi ornare fermentum. Sed ' +
      'urna nulla, lacinia id mollis eu, dignissim eu metus. Pellentesque cursus dignissim nisi sit amet mollis. ' +
      'Etiam a eleifend mi. Integer et lectus nec lacus finibus vehicula.')];

    const allTags = this.tagService.getAllTags();
    section1.tags = [allTags[0]];
    pC.tags = [allTags[0], allTags[1]];
    subSection.addChildren(pB, pC);
    section1.addChildren(pA, subSection);
    root.addChildren(pIntro, section1);
    return root;
  }
}
