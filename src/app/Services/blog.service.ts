import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../,,/../../environments/environment';
import { Blog } from '../Models/blog';
import { Response } from '../Models/response';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }


  GetAllBlogs(PageNumber:number,RecordsPerPage:number):Observable<Response> {
    return this.http.get<Response>(environment.APIURL+'api/Blog?PageNumber='+PageNumber+'&RecordsPerPage='+RecordsPerPage);
  }

  GetBlogById(id:number):Observable<Response> {
    return this.http.get<Response>(environment.APIURL+'api/Blog/GetBlogById/'+id);
  }

  ManageBlog(blog:Blog):Observable<Response> {
    return this.http.post<Response>(environment.APIURL+'api/Blog/ManageBlog/',blog);
  }

  DeleteBlogById(id:number):Observable<Response> {
    return this.http.delete<Response>(environment.APIURL+'api/Blog/DeleteBlogById/'+id);
  }
}
