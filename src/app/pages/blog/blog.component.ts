import { Component, OnInit } from '@angular/core';
import { BlogPost, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit(): void {

	this.postService.getBlogPost().subscribe((posts: BlogPost[]) => {
		console.log("posts", posts);
      })
  }

}
