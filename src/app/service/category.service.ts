import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private CATEGORY_PATH="/category";

  constructor(private apiService:ApiService) { }

  createCategory(title:any) : Observable<any>{
    return this.apiService.post(this.CATEGORY_PATH,title).pipe(map(
      res=>{
        if(res){
          return res;
        }else{
          return {};
        }
      }
    ));
  }

  getAllCategorys() : Observable<any>{
    return this.apiService.get(this.CATEGORY_PATH).pipe(map(
      res=>{
        if(res){
          return res;
        }else{
          return {};
        }
      }
    ));
  }

  deleteCategory(id:number) : Observable<any>{
    return this.apiService.delete(this.CATEGORY_PATH+"/"+id).pipe(map(
      res=>{
        if(res){
          return res;
        }else{
          return {};
        }
    }

    ));
  }
}
  
  
