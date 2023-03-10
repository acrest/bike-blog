import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

export enum BlogPostTag {
	LIFESTYLE = "Lifestyle",
	CROSS_COUNTRY = "XC",
	ENDURO = "Enduro",
	ROAD = "Road",
	NEWS = "News",
	TRAILS = "Trails"
}

export class BlogPost {
	id: string;
	title: string;
	date: number;
	images: string[];
	videos: string[];
	stravas: string[];
	subTitle: string;
	content: string;
	tags: string[];

	constructor(id: string, title: string, date: number, images: string[], videos: string[], stravas: string[], subTitle: string, content: string, tags: string[]) {
		this.id = id;
		this.title = title;
		this.date = date;
		this.images = images;
		this.videos = videos;
		this.stravas = stravas;
		this.subTitle = subTitle;
		this.content = content;
		this.tags = tags;
	}
}

export class BlogPhoto {
	id: string;
	title: string;
	description: string;
	url: string;

	constructor(id: string, title: string, description: string, url: string) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.url = url;
	}

	public static getBlogPhotoFromString(jsonString: string): BlogPhoto {
		return JSON.parse(jsonString);
	}
}

export class BlogVideo {
	id: string;
	title: string;
	description: string;

	constructor(id: string, title: string, description: string) {
		this.id = id;
		this.title = title;
		this.description = description;
	}

	public static getBlogVideoFromString(jsonString: string): BlogVideo {
		return JSON.parse(jsonString);
	}
}

export class BlogStrava {
	id: string;
	title: string;
	description: string;

	constructor(id: string, title: string, description: string) {
		this.id = id;
		this.title = title;
		this.description = description;
	}

	public static getBlogStravaFromString(jsonString: string): BlogVideo {
		return JSON.parse(jsonString);
	}
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

	private firebaseDocumentName: string = "blog-post";
	constructor(private firestore: AngularFirestore) { }
  
	public getAllBlogPosts() {
	  return this.firestore.collection(this.firebaseDocumentName, ref => ref.orderBy("date", "desc")).snapshotChanges().pipe(
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
  
	public getBlogPostById(id: string) {
	  return this.firestore.collection(this.firebaseDocumentName, ref => ref.where('id', '==', id)).snapshotChanges().pipe(
		map(action => {
		  let blogPost: BlogPost | undefined;
		  action.forEach((foundObject) => {
			const data = foundObject.payload.doc.data() as BlogPost;
			if (data) {
			  const id = foundObject.payload.doc.id;
			  blogPost = { ...data };
			}
		  });
		  return blogPost;
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
