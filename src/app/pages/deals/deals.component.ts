import { Component, OnInit } from '@angular/core';
import { Deal, DealService } from 'src/app/services/deal.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

	constructor(private dealService: DealService) { }
	
	public deals: Deal[];
  
	ngOnInit(): void {
	  this.dealService.getDeal().subscribe((posts: Deal[]) => {
		  this.deals = posts;
		})
	}
}
