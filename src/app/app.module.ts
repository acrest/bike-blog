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
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { BlogPhotoComponent } from './components/blog-photo/blog-photo.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CreateDealComponent } from './pages/create-deal/create-deal.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { AttachVideoComponent } from './components/attach-video/attach-video.component';
import { AttachStravaComponent } from './components/attach-strava/attach-strava.component';
import { BikeBuilderComponent } from './pages/bike-builder/bike-builder.component';

//Material
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CompatibilityComponent } from './components/compatibility/compatibility.component';
import { DimensionsComponent } from './components/dimensions/dimensions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    CreateDealComponent,
    AttachVideoComponent,
	AttachStravaComponent,
 	BikeBuilderComponent,
	CompatibilityComponent,
	DimensionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	AngularFireModule.initializeApp(environment.firebaseConfig),
	AngularFireStorageModule,
	AuthModule,
	AngularFireDatabaseModule,
	FormsModule,
	YouTubePlayerModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
	BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
