import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces'
import { BlogPhoto } from 'src/app/services/post.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

	@Output()
	public newPhotoAdded: EventEmitter<BlogPhoto> = new EventEmitter();
  
	@Input()
	public folderName: string;
  
	public filename: string;
	public file: File;
	public uploading: boolean = false;

	public title: string;
	public description: string;
  
	constructor(private afStorage: AngularFireStorage) { }
  
	ngOnInit(): void {
	}
  
	public upload($event: any): void {
	  this.file = $event.target.files[0];
	  this.filename = this.file.name.split(".")[0] + Math.random();
	}
  
	public uploadImage(): void {
	  this.uploading = true;
	  this.afStorage.upload("/files/" + this.folderName + this.filename, this.file).then((testObject: UploadTaskSnapshot) => {
		testObject.ref.getDownloadURL().then((photoUrl: string) => {
		  this.uploading = false;
		  this.newPhotoAdded.emit(new BlogPhoto(uuidv4(), this.title, this.description, photoUrl))
		})
	  })
	}
}
