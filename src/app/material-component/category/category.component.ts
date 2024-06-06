import { CategoryService } from './../../service/category.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {


  constructor(public matDialog:MatDialog,private categoryService:CategoryService){}

  openDialog(): void {
    const dialogRef = this.matDialog.open(CategoryDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.categoryService.createCategory(result).subscribe(response => {
          console.log('Category added successfully:', response);
        });
      }
    });
  }
}


