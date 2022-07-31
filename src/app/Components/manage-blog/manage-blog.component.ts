import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/Models/blog';
import { Response } from 'src/app/Models/response';
import { BlogService } from 'src/app/Services/blog.service';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.css']
})
export class ManageBlogComponent implements OnInit {
  blog: Blog;
  editedBlog: Blog | any;
  constructor(private route: ActivatedRoute, private router: Router, private service: BlogService, private _snackBar:MatSnackBar) {
    this.blog = {
      id: 0,
      title: '',
      body: '',
      creationDate: new Date()
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      if (data['id'] > 0) {
        this.blog.id = +data['id'];
        this.service.GetBlogById(data['id']).subscribe((res: any) => {
          if (res.status) {
            this.blog = res.response;
            this.editedBlog = Object.assign({}, this.blog);
            this.blog.creationDate = new Date(res.response.creationDate);
            this.editedBlog.creationDate = new Date(res.response.creationDate);
            console.log(this.blog);
          }
        })
      }
    });
  }
  onSubmit() {
    if (JSON.stringify(this.blog) != JSON.stringify(this.editedBlog)) {
      this.service.ManageBlog(this.blog).subscribe((res: Response) => {
        if (res.status) {
          this.router.navigate(['/home']);
        } else {
          alert(res.message);
        }
        this._snackBar.open(res.message, '',{
          duration:500
        });
      })
    }else{
      this._snackBar.open('No Changes', '',
      { duration: 500 });
      this.router.navigate(['/home']);
    }

  }
  GoHome() {
    this.router.navigate(['/home'],{ skipLocationChange: true });
  }
  restBlog() {
    this.blog = {
      id: 0,
      title: '',
      body: '',
      creationDate: new Date()
    };
  }
}
