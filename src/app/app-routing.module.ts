import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { DealsComponent } from './pages/deals/deals.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
	{path: "home", component: HomeComponent},
	{path: "deals", component: DealsComponent},
	{path: "blog", component: BlogComponent},
	{path: "create-post", component: CreatePostComponent},
	{path: "post/:id", component: BlogPostComponent},
	{path: "admin/sign-in", component: SignInComponent},
	{path: "", component: BlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
