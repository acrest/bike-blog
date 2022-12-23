import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPhoto, BlogPost, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private postService: PostService, private router: Router) { }
  
  public posts: BlogPost[];
  public blogPhotos: BlogPhoto[] = [];

  ngOnInit(): void {
	this.postService.getBlogPost().subscribe((posts: BlogPost[]) => {
		this.posts = posts;
		this.posts.forEach((post: BlogPost) => {
			this.blogPhotos.push(JSON.parse(post.images[0]))
		})
		console.log("posts", this.posts);
      })
  }

  public goToPost(id: string): void {
	this.router.navigate(["post/" + id]);
  }
}
