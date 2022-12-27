import { Component, OnDestroy, Input } from '@angular/core';
import { BikeComponent } from 'src/app/classes/bike-component';

@Component({
  selector: 'app-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.scss']
})
export class DimensionsComponent implements OnDestroy {

  @Input() public component: BikeComponent

  constructor() { }

  ngOnDestroy(): void {
    this.component = null;
  }

}
