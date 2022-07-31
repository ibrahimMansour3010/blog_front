import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Blog } from 'src/app/Models/blog';
import { BlogDetailsComponent } from '../blog-details/blog-details.component';
import { MatDialog } from '@angular/material/dialog';
import { BlogItem } from 'src/app/Models/blog-item';
import { BlogService } from 'src/app/Services/blog.service';
import { Response } from 'src/app/Models/response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'title', 'settings'];
  blogs: BlogItem[] = [];
  dataSource = new MatTableDataSource<BlogItem>(this.blogs);
  deletedId:number = 0;
  PageNumber:number=0;
  totalRows:number=0;
  RecordsPerPage:number=2;
  loading:boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(public dialog: MatDialog, private service: BlogService,private _snackBar: MatSnackBar) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.GetAllBlogs();
    console.log('ssssss');
  }

  ngOnInit(): void {
    this.GetAllBlogs();
  }
  openDialog(blog: Blog) {
    this.dialog.open(BlogDetailsComponent, {
      data: blog,
      width:'50%'
    });
  }
  GetAllBlogs() {
    setTimeout(() => {
      this.loading = true;
      this.service.GetAllBlogs(this.PageNumber,this.RecordsPerPage).subscribe((res: Response) => {
        if (res.status) {
          this.blogs = res.response.data;
          this.dataSource = new MatTableDataSource<BlogItem>(this.blogs)
          this.dataSource.paginator = this.paginator;
          this.totalRows = res.response.totalRows;
        }
        this.loading = false;
      })
    }, 1);
  }
  deleteBlog() {
    this.loading = true;
    this.service.DeleteBlogById(this.deletedId).subscribe(res => {
      if (res.status) {
        this._snackBar.open(res.message, '',
          { duration: 500 });
          this.loading = false;
          this.GetAllBlogs();
      }
    });
  }
  pageChanged(event: PageEvent){
    this.RecordsPerPage = event.pageSize;
    this.PageNumber = event.pageIndex;
    this.loading = true;
    this.service.GetAllBlogs(event.pageIndex,event.pageSize).subscribe((res: Response) => {
      if (res.status) {
        this.blogs = res.response.data;
        this.dataSource = new MatTableDataSource<BlogItem>(this.blogs)
        this.loading = false;
      }
    })
  }
}
