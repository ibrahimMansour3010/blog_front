import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Blog } from 'src/app/Models/blog';
import { Response } from 'src/app/Models/response';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blog:Blog={
    id:0,
    body:'',
    creationDate:new Date(),
    title:''
  };
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Blog,private service:BlogService) { }

  ngOnInit(): void {
    this.service.GetBlogById(this.data.id).subscribe((res:Response)=>{
      this.blog = res.response
      console.log(this.blog);
    })
  }

}
