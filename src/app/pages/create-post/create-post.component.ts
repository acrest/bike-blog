import { Component, OnInit } from '@angular/core';
import { BlogPhoto, BlogPost, BlogPostTag, PostService } from 'src/app/services/post.service';
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
	public tags: string[] = [];
	public possibleTagValues = Object.keys(BlogPostTag);

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  public createPost(): void {
	const blogPhotoStrings: string[] = [];
	this.blogPhotos.forEach((blogPhoto: BlogPhoto) => {
		blogPhotoStrings.push(JSON.stringify(blogPhoto));
	})
	const blogPost: BlogPost = new BlogPost(uuidv4(), this.title, Date.now(), blogPhotoStrings, this.subTitle, this.content, this.tags);
	this.postService.createBlogPost(blogPost);
  }

  public uploadPhoto() {
    this.isUploadingPhoto = true;
  }

  public newPhotoAdded(blogPhoto: any) {
    this.blogPhotos.push(blogPhoto);
    this.isUploadingPhoto = false;
  }

  public tagUpdated(tag: string, event: any): void {
	if (event.target.checked)
	{
		this.tags.push(tag)
	}
	else
	{
		const index: number = this.tags.indexOf(tag);
		this.tags.splice(index);
	}
  }

}
