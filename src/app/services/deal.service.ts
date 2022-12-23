import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

export enum DealTag {
	LIFESTYLE = "Lifestyle",
	CROSS_COUNTRY = "XC",
	ENDURO = "Enduro",
	ROAD = "Road",
	NEWS = "News"
}

export class Deal {
	id: string;
	title: string;
	date: number;
	imageUrl: string;
	content: string;
	tags: string[];
	url: string;
	urlName: string;

	public constructor(id: string, title: string, date: number, imageUrl: string, content: string, tags: string[], url: string, urlName: string) {
		this.id = id;
		this.title = title;
		this.date = date;
		this.imageUrl = imageUrl;
		this.content = content;
		this.tags = tags;
		this.url = url;
		this.urlName = urlName;
	}
}

@Injectable({
  providedIn: 'root'
})
export class DealService {

	private firebaseDocumentName: string = "deal";
	constructor(private firestore: AngularFirestore) { }

	public getAllDeals(): Promise<any> {
	  return new Promise<any>((resolve: (blogPosts: Deal[]) => void) => {
		this.getDeal().subscribe((newDeals: Deal[]) => {
		  const promises: Promise<any>[] = [];
		  newDeals.forEach(async (newDeal: Deal) => {
			console.log("newDeal", newDeal);
			resolve(newDeals);
		  })
		})
	  });
	}
  
	public getDeal() {
	  return this.firestore.collection(this.firebaseDocumentName, ref => ref.where('title', '!=', "")).snapshotChanges().pipe(
		map(action => {
		  let blogPosts: Deal[] = [];
		  action.forEach((foundObject) => {
			let blogPost;
			const data = foundObject.payload.doc.data() as Deal;
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
  
	public getDealById(id: string) {
	  return this.firestore.collection(this.firebaseDocumentName, ref => ref.where('id', '==', id)).snapshotChanges().pipe(
		map(action => {
		  let blogPost: Deal | undefined;
		  action.forEach((foundObject) => {
			const data = foundObject.payload.doc.data() as Deal;
			if (data) {
			  const id = foundObject.payload.doc.id;
			  blogPost = { ...data };
			}
		  });
		  return blogPost;
		})
	  );
	}

  
	public createDeal(blogPost: Deal) {
	  return this.firestore.collection(this.firebaseDocumentName).add(Object.assign({}, blogPost));
	}
  
	// public updateDeal(blogPost: Deal) {
	//   delete blogPost.id;
	//   return this.firestore.doc(this.firebaseDocumentName + '/' + blogPost.id).update(Object.assign({}, blogPost));
	// }
  
	public deleteDeal(blogPostId: string) {
	  return this.firestore.doc(this.firebaseDocumentName + '/' + blogPostId).delete();
	}
}
