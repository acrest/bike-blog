import { Component, Input, OnInit } from '@angular/core';
import { FileService, FileUpload } from 'src/app/services/file.service';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements OnInit {
	@Input() fileUpload!: FileUpload;

	constructor(private uploadService: FileService) { }
  
	ngOnInit(): void {
	}
  
	deleteFileUpload(fileUpload: FileUpload): void {
	  this.uploadService.deleteFile(fileUpload);
	}
}
