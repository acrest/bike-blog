import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';


export class BlogPost {
	id: string;
	title: string;
	date: string;
	images: string[];
	subTitle: string;
	content: string;

	constructor(id: string, title: string, date: string, images: string[], subTitle: string, content: string) {
		this.id = id;
		this.title = title;
		this.date = date;
		this.images = images;
		this.subTitle = subTitle;
		this.content = content;
	}
}

export class BlogPhoto {
	title: string;
	description: string;
	url: string;

	constructor(title: string, description: string, url: string) {
		this.title = title;
		this.description = description;
		this.url = url;
	}

	public static getBlogPhotoFromString(jsonString: string): BlogPhoto {
		return JSON.parse(jsonString);
	}
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

	private firebaseDocumentName: string = "blog-post";
	constructor(private firestore: AngularFirestore) { }

	public getAllBlogPosts(): Promise<any> {
	  return new Promise<any>((resolve: (blogPosts: BlogPost[]) => void) => {
		this.getBlogPost().subscribe((newBlogPosts: BlogPost[]) => {
		  const promises: Promise<any>[] = [];
		  newBlogPosts.forEach(async (newBlogPost: BlogPost) => {
			console.log("newBlogPost", newBlogPost);
			resolve(newBlogPosts);
		  })
		})
	  });
	}
  
	public getBlogPost() {
	  return this.firestore.collection(this.firebaseDocumentName, ref => ref.where('title', '!=', "")).snapshotChanges().pipe(
		map(action => {
		  let blogPosts: BlogPost[] = [];
		  action.forEach((foundObject) => {
			let blogPost;
			const data = foundObject.payload.doc.data() as BlogPost;
			if (data) {
			  const id = foundObject.payload.doc.id;
			  blogPost = { ...data };
				blogPosts.push(blogPost);
			}
		  });
		  return blogPosts;
		})
	  );
	}

  
	public createBlogPost(blogPost: BlogPost) {
	  return this.firestore.collection(this.firebaseDocumentName).add(Object.assign({}, blogPost));
	}
  
	// public updateBlogPost(blogPost: BlogPost) {
	//   delete blogPost.id;
	//   return this.firestore.doc(this.firebaseDocumentName + '/' + blogPost.id).update(Object.assign({}, blogPost));
	// }
  
	public deleteBlogPost(blogPostId: string) {
	  return this.firestore.doc(this.firebaseDocumentName + '/' + blogPostId).delete();
	}
}
