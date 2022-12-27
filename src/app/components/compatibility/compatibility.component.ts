import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Bike, BikeComponent, CompatibleDimensions } from 'src/app/classes/bike-component';

@Component({
  selector: 'app-compatibility',
  templateUrl: './compatibility.component.html',
  styleUrls: ['./compatibility.component.scss']
})
export class CompatibilityComponent implements OnInit, OnChanges {

  @Input() public selectedComponent: BikeComponent
  @Input() public bike: Bike
  @Output() public goToComponentEvent: EventEmitter<string> = new EventEmitter<string>();

  public compatibleDimensions: CompatibleDimensions[];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.selectedComponent && this.bike)
    {
      this.compatibleDimensions = this.selectedComponent.getCompatibleDimensions(this.bike);
    }
  }

  public goToComponent(dimensions: CompatibleDimensions): void {
    this.goToComponentEvent.emit(dimensions.matchDimension.belongingComponent);
  }

}
