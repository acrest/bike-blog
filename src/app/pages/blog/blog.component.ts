import { Component, OnInit } from '@angular/core';
import { BlogPhoto, BlogPost, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private postService: PostService) { }
  
  public posts: BlogPost[];
  public blogPhotos: BlogPhoto[] = [];

  ngOnInit(): void {

	this.postService.getBlogPost().subscribe((posts: BlogPost[]) => {
		this.posts = posts;
		this.posts.forEach((post: BlogPost) => {
			this.blogPhotos.push(JSON.parse(post.images[0]))
		})
      })
  }



}
