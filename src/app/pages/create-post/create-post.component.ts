import { Component, OnInit } from '@angular/core';
import { BlogPhoto, BlogPost, PostService } from 'src/app/services/post.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

	public isUploadingPhoto: boolean = false;

	public blogPhotos: BlogPhoto[] = [];
	public title: string;
	public subTitle: string;
	public content: string;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  public createPost(): void {
	const blogPhotoStrings: string[] = [];
	this.blogPhotos.forEach((blogPhoto: BlogPhoto) => {
		blogPhotoStrings.push(JSON.stringify(blogPhoto));
	})
	const blogPost: BlogPost = new BlogPost(uuidv4(), this.title, Date.now(), blogPhotoStrings, this.subTitle, this.content);
	this.postService.createBlogPost(blogPost);
  }

  public uploadPhoto() {
    this.isUploadingPhoto = true;
  }

  public newPhotoAdded(blogPhoto: any) {
    this.blogPhotos.push(blogPhoto);
	console.log("blogPhotos", this.blogPhotos)
    this.isUploadingPhoto = false;
  }

}
