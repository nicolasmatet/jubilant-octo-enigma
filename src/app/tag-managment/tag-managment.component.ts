import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TagService} from "../services/tag.service";
import {MatDialog} from "@angular/material/dialog";
import {ShortTextDialogComponent} from "../short-text-dialog/short-text-dialog.component";
import {ReportTag, TagGraph} from "../models/reportTag.model";

@Component({
  selector: 'app-tag-managment',
  templateUrl: './tag-managment.component.html',
  styleUrls: ['./tag-managment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagManagmentComponent implements OnInit {
  tagTree: TagGraph;
  rootTags: ReportTag[];
  leafTags: ReportTag[];

  constructor(private tagService: TagService, private dialog: MatDialog, private changeDetector: ChangeDetectorRef) {
    this.tagTree = this.tagService.getTagTree();
    this.leafTags = this.tagTree.leafTags();
    this.rootTags = this.tagTree.rootTags();
    console.log("rootTags", this.rootTags);
  }

  ngOnInit(): void {
  }

  addChild(parentTag: ReportTag) {
    this.dialog.open(ShortTextDialogComponent, {
      data: {
        width: '550px',
        height: '120px',
        data: {message: 'Enter new tag name', yesText: 'Ok', value: ''}
      }
    }).afterClosed().subscribe(tagId => {
      console.log("closed", tagId);
      if (tagId && !this.tagTree.has(tagId)) {
        const newTag = this.tagService.createTag(tagId);
        console.log("newTag", newTag);
        this.tagTree.addTags(newTag);
        this.tagTree.addRelation(parentTag, newTag);
        console.log("tagtree", this.tagTree);
        this.changeDetector.markForCheck();
      }
    });
  }

  addParent(childTag: ReportTag) {
    this.dialog.open(ShortTextDialogComponent, {
      data: {
        width: '550px',
        height: '120px',
        data: {message: 'Enter new tag name', yesText: 'Ok', value: ''}
      }
    }).afterClosed().subscribe(tagId => {
      console.log("closed", tagId);
      if (tagId && !this.tagTree.has(tagId)) {
        const newTag = this.tagService.createTag(tagId);
        console.log("newTag", newTag);
        this.tagTree.addTags(newTag);
        this.tagTree.addRelation(newTag, childTag);
        console.log("tagtree", this.tagTree);
        this.changeDetector.markForCheck();
      }
    });
  }

}
