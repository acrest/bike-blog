import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DealsComponent } from './pages/deals/deals.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { UploadComponent } from './components/upload/upload.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { BlogPhotoComponent } from './components/blog-photo/blog-photo.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CreateDealComponent } from './pages/create-deal/create-deal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    BlogComponent,
    DealsComponent,
    UploadComponent,
    CreatePostComponent,
    LoadingComponent,
    BlogPostComponent,
    BlogPhotoComponent,
    SignInComponent,
    CreateDealComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	AngularFireModule.initializeApp(environment.firebaseConfig),
	AngularFireStorageModule,
	AuthModule,
	AngularFireDatabaseModule,
	FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
