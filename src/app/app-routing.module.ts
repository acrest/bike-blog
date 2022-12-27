import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BikeBuilderComponent } from './pages/bike-builder/bike-builder.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CreateDealComponent } from './pages/create-deal/create-deal.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { DealsComponent } from './pages/deals/deals.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
	{path: "home", component: HomeComponent},
	{path: "deals", component: DealsComponent},
	{path: "blog", component: BlogComponent},
	{path: "create-post", component: CreatePostComponent},
	{path: "create-deal", component: CreateDealComponent},
	{path: "post/:id", component: BlogPostComponent},
	{path: "admin/sign-in", component: SignInComponent},
	{path: "tools", component: BikeBuilderComponent},
	{path: "", component: BlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
