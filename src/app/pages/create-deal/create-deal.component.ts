import { Component, OnInit } from '@angular/core';
import { Deal, DealService, DealTag } from 'src/app/services/deal.service';
import { BlogPhoto } from 'src/app/services/post.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.scss']
})
export class CreateDealComponent implements OnInit {

	public isUploadingPhoto: boolean = false;

	public title: string;
	public content: string;
	public imageUrl: string;
	public tags: string[] = [];
	public url: string;
	public DealTag = DealTag;
	public urlName: string;
	public possibleTagValues = Object.keys(DealTag);

  constructor(private dealService: DealService) {
  }

  ngOnInit(): void {
  }

  public createDeal(): void {
	const deal: Deal = new Deal(uuidv4(), this.title, Date.now(), this.imageUrl, this.content, this.tags, this.url, this.urlName);
	this.dealService.createDeal(deal);
  }

  public uploadPhoto() {
    this.isUploadingPhoto = true;
  }

  public newPhotoAdded(blogPhoto: BlogPhoto) {
	this.imageUrl = blogPhoto.url;
    this.isUploadingPhoto = false;
  }

  public tagUpdated(tag: string, event: any): void {
	if (event.target.checked)
	{
		this.tags.push(tag)
	}
	else
	{
		const index: number = this.tags.indexOf(tag);
		this.tags.splice(index);
	}
  }
}
