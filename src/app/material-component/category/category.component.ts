import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { Category } from './category';
import { ConfirmationDialogService } from 'src/app/service/confirmation-dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  categories:Category[]=[];

  constructor(public matDialog:MatDialog,private categoryService:CategoryService,
    private confirmationDialogService:ConfirmationDialogService,private toastr:ToastrService
  ){}
  
  ngOnInit(): void {
    this.getAllCategorys();
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(CategoryDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.categoryService.createCategory(result).subscribe(response => {
          console.log('Category added successfully:', response);
          this.getAllCategorys();
          this.toastr.success('Category added successfully');
        });
      }
    });
  }

  getAllCategorys(){

    this.categoryService.getAllCategorys().subscribe(response => {
    this.categories = response;
  },
   throwError => {
     console.log(throwError);
   })  
  }


  deleteCategory(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this category')
      .then((confirmed) => {
        if (confirmed) {
          this.categoryService.deleteCategory(id).subscribe(
            (data) => {
              this.toastr.success('Category Deleted successfully =' + id);
              this.getAllCategorys();
            },
            (error: HttpErrorResponse) => {
              this.toastr.error("An error occurred, please try again later");
            }
          );
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
