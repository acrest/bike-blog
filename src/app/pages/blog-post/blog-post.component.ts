import { Component, ElementRef, NgZone, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { BlogPhoto, BlogPost, BlogStrava, BlogVideo, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogPostComponent implements OnInit {

	public post: BlogPost;
	public photos: BlogPhoto[] = [];
	public videos: BlogVideo[] = [];
	public stravas: BlogStrava[] = [];
	public sanitizedText: SafeHtml;
	public loading: boolean = true;
	@ViewChild('youtubeDiv', { static: false })
	public el:ElementRef;

	public constructor(private activatedRoute: ActivatedRoute, private ngZone: NgZone,
		private postService: PostService, private domSanitizer: DomSanitizer) {
	}

	public ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) =>
		{
			this.postService.getBlogPostById(params.id).subscribe((blogPost: any) => {
				console.log(blogPost)
				this.post = blogPost;
				let content = this.post.content;
				this.post.images.forEach((imageString: string) => {
					let photo: BlogPhoto = JSON.parse(imageString);
					this.photos.push(photo);
					content = content.replace(photo.id, this.getBlogPhotoElementString(photo));
				});
				this.post.videos.forEach((videoString: string) => {
					let video: BlogVideo = JSON.parse(videoString);
					this.videos.push(video);
					content = content.replace(video.id, this.getYoutubeVideoEmbedded(video));
				});
				this.post.stravas.forEach((stravaString: string) => {
					let strava: BlogStrava = JSON.parse(stravaString);
					this.stravas.push(strava);
					content = content.replace(strava.id, this.getYoutubeVideoEmbedded(strava));
				});
				this.sanitizedText = this.domSanitizer.bypassSecurityTrustHtml(content);
				// this.el.nativeElement.innerHTML = content;
			})
		});
  	}

	public ngAfterViewChecked(): void {
		this.photos.forEach((photo: BlogPhoto) => {
			const ytElement: HTMLElement = document.getElementById(photo.id)
			document.getElementById(photo.id + "_placeholder").appendChild(ytElement);
		});
		this.videos.forEach((video: BlogVideo) => {
			const ytElement: HTMLElement = document.getElementById(video.id)
			document.getElementById(video.id + "_placeholder").appendChild(ytElement);
		});
		this.stravas.forEach((strava: BlogStrava) => {
			const stravaElement: HTMLElement = document.getElementById(strava.id)
			document.getElementById(strava.id + "_placeholder").appendChild(stravaElement);
		});
	}

	public getBlogPhotoElementString(photo: BlogPhoto): string {
		return `<div id="${photo.id}_placeholder"></div>`;
	}

	public getYoutubeVideoEmbedded(video: BlogVideo): string {
		// return `<pre><youtube-player [videoId]="'${video.id}'"></youtube-player></pre>`;
		return `<div id="${video.id}_placeholder"></div>`;
	}

	public getStravaEmbedded(strava: BlogStrava): string {
		// return `<pre><youtube-player [videoId]="'${video.id}'"></youtube-player></pre>`;
		return `<div id="${strava.id}_placeholder"></div>`;
	}
}
