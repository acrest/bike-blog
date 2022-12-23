import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogPhoto, BlogPost, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogPostComponent implements AfterViewInit {

	public post: BlogPost;
	public photos: BlogPhoto[] = [];
	public sanitizedText: SafeHtml;
	public loading: boolean = true;
	@ViewChild('contentDiv', { static: false })
	public el:ElementRef;

	public constructor(private activatedRoute: ActivatedRoute, private router: Router,
		private postService: PostService, private domSanitizer: DomSanitizer) {
	}

	public ngAfterViewInit() {
		this.activatedRoute.params.subscribe((params: Params) =>
		{
			this.postService.getBlogPostById(params.id).subscribe((blogPost: any) => {
				this.post = blogPost;
				let content = this.post.content;
				this.post.images.forEach((imageString: string) => {
					let photo: BlogPhoto = JSON.parse(imageString);
					content = content.replace(photo.id, this.getBlogPhotoElementString(photo));
				})
				console.log("content", content);
				this.sanitizedText = this.domSanitizer.bypassSecurityTrustHtml(content);
				// this.el.nativeElement.innerHTML = content;
			})
		});
  	}

	public getBlogPhotoElementString(photo: BlogPhoto): string {
		return `<pre><div class="embedded-image">
					<img src="${photo.url}">
					<div class="title">${photo.title}</div>
					<div class="description">${photo.description}</div>
				</div></pre>`
	}
}
