import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BlogStrava } from 'src/app/services/post.service';

@Component({
  selector: 'app-attach-strava',
  templateUrl: './attach-strava.component.html',
  styleUrls: ['./attach-strava.component.scss']
})
export class AttachStravaComponent {
	@Output()
	public newStravaAdded: EventEmitter<BlogStrava> = new EventEmitter();
  
	public filename: string;
	public file: File;
	public uploading: boolean = false;

	public title: string;
	public description: string;
	public id: string;
  
	public attachStrava(): void {
		this.newStravaAdded.emit(new BlogStrava(this.id, this.title, this.description))
	}
}
