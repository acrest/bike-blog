import { Component, Input } from '@angular/core';
import { BlogPhoto } from 'src/app/services/post.service';

@Component({
  selector: 'app-blog-photo',
  templateUrl: './blog-photo.component.html',
  styleUrls: ['./blog-photo.component.scss']
})
export class BlogPhotoComponent {
	@Input()
	public photo: BlogPhoto;

	public constructor() {
		console.log("blog photo", this.photo);
	}
}
