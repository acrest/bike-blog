import { Component, OnInit } from '@angular/core';
import { BlogPhoto, BlogPost, BlogPostTag, BlogStrava, BlogVideo, PostService } from 'src/app/services/post.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

	public isUploadingPhoto: boolean = false;
	public isAttachingVideo: boolean = false;
	public isAttachingStrava: boolean = false;

	public blogPhotos: BlogPhoto[] = [];
	public blogVideos: BlogVideo[] = [];
	public stravas: BlogStrava[] = [];
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
	const blogVideoStrings: string[] = [];
	const blogStravaStrings: string[] = [];
	this.blogPhotos.forEach((blogPhoto: BlogPhoto) => {
		blogPhotoStrings.push(JSON.stringify(blogPhoto));
	})
	this.blogVideos.forEach((blogVideo: BlogVideo) => {
		blogVideoStrings.push(JSON.stringify(blogVideo));
	})
	this.stravas.forEach((blogStrava: BlogStrava) => {
		blogStravaStrings.push(JSON.stringify(blogStrava));
	});
	const blogPost: BlogPost = new BlogPost(uuidv4(), this.title, Date.now(), blogPhotoStrings, blogVideoStrings, blogStravaStrings, this.subTitle, this.content, this.tags);
	this.postService.createBlogPost(blogPost).then(() => {
		this.blogPhotos = [];
		this.blogVideos = [];
		this.stravas = [];
		this.title = "";
		this.subTitle = "";
		this.content = "";
		this.tags = [];
	});
  }

  public uploadPhoto() {
    this.isUploadingPhoto = true;
  }

  public attachVideo() {
    this.isAttachingVideo = true;
  }

  public attachStrava() {
    this.isAttachingStrava = true;
  }

  public newPhotoAdded(blogPhoto: BlogPhoto) {
    this.blogPhotos.push(blogPhoto);
    this.isUploadingPhoto = false;
  }

  public newVideoAttached(blogVideo: BlogVideo) {
    this.blogVideos.push(blogVideo);
    this.isAttachingVideo = false;
  }

  public newStravaAttached(blogStrava: BlogStrava) {
    this.stravas.push(blogStrava);
    this.isAttachingStrava = false;
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
