import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


export interface NewFileDialogData {
  message: string;
  yesText: string;
  value?: string;
}

@Component({
  selector: 'app-short-text-dialog',
  templateUrl: './short-text-dialog.component.html',
  styleUrls: ['./short-text-dialog.component.scss']
})
export class ShortTextDialogComponent implements OnInit {
  fileNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9].*'),
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(@Inject(MAT_DIALOG_DATA) public data: NewFileDialogData,
              public dialogRef: MatDialogRef<ShortTextDialogComponent>,
  ) {
  }

  ngOnInit(): void {
    if (this.data.value) {
      this.fileNameFormControl.setValue(this.data.value);
    }
  }


  onClickOk() {
    this.dialogRef.close(this.fileNameFormControl.value);
  }

}
