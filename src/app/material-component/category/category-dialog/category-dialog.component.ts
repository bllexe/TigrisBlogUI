import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {

  categoryForm:FormGroup;

  constructor(public dialogRef:MatDialogRef<CategoryDialogComponent>,
    private fb:FormBuilder
  ){
    this.categoryForm=this.fb.group({
      title:['',Validators.required]
    });
  }

   onAdd():void{
    if(this.categoryForm.valid){
      this.dialogRef.close(this.categoryForm.value);
    }
   }

   onCancel():void{
    this.dialogRef.close();
   }
}
