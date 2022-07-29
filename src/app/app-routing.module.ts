import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './Components/blog/blog.component';
import { ManageBlogComponent } from './Components/manage-blog/manage-blog.component';

const routes: Routes = [
  {path:'addBlog',component: ManageBlogComponent},
  {path:'editBlog/:id',component: ManageBlogComponent},
  {path:'home',component: BlogComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
