import { Component, OnInit } from '@angular/core';
import { BlogPhoto, BlogPost, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  createPost(): void {
	let photo1: BlogPhoto = new BlogPhoto("first photo", "this is the first one", "https://images.immediate.co.uk/production/volatile/sites/21/2022/09/Cervelo-Soloist-road-bike-review-19-e8ab504.jpg?quality=90&resize=768%2C574")
	let photo2: BlogPhoto = new BlogPhoto("second photo", "this is the second one", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGGtJJiijX6lkugsJpHj9krZ8KsovGwt9ooFp32x7YFnzpXtd9WQSqWSw0ryw1OAU8f9Q&usqp=CAU")
	this.postService.createBlogPost(new BlogPost("", "this is the title", "12/21/22", [JSON.stringify(photo1), JSON.stringify(photo2)], "this is the sub title", "This will be where all the content goes"));
  }

}
