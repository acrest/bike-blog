import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { DealsComponent } from './pages/deals/deals.component';

const routes: Routes = [
	{path: "home", component: HomeComponent},
	{path: "deals", component: DealsComponent},
	{path: "blog", component: BlogComponent},
	{path: "create-post", component: CreatePostComponent},
	{path: "", component: BlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
