import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BlogVideo } from 'src/app/services/post.service';

@Component({
  selector: 'app-attach-video',
  templateUrl: './attach-video.component.html',
  styleUrls: ['./attach-video.component.scss']
})
export class AttachVideoComponent {
	@Output()
	public newVideoAdded: EventEmitter<BlogVideo> = new EventEmitter();
  
	public filename: string;
	public file: File;
	public uploading: boolean = false;

	public title: string;
	public description: string;
	public id: string;
  
	public attachVideo(): void {
		this.newVideoAdded.emit(new BlogVideo(this.id, this.title, this.description))
	}
}
