import { Component, OnInit } from '@angular/core';
import { Bike, BikeComponent, CompatibleDimensions, ComponentType, DimensionKey, Drivetrain, Suspension } from 'src/app/classes/bike-component';

@Component({
  selector: 'app-component-checker',
  templateUrl: './component-checker.component.html',
  styleUrls: ['./component-checker.component.scss']
})
export class ComponentCheckerComponent implements OnInit {

  constructor() { }

  public componentTypes: ComponentType[] = Object.values(ComponentType)
  public selectedComponentType: ComponentType;
  public bike: Bike = new Bike(null, Drivetrain.TWO_BY, Suspension.FULL);
  public compatibleDimensions: CompatibleDimensions[];
  public selectedComponent: BikeComponent

  public componentDependencyGroups: Map<ComponentType, CompatibleDimensions[]> = new Map()
  public componentDependencyKeys: ComponentType[] = []
  public replacementDimensions: CompatibleDimensions[] = []

  ngOnInit(): void {}

  public selectedComponentChanged(componentType: ComponentType) {
	console.log("componenttype", Object.keys(ComponentType)[Object.values(ComponentType).indexOf(componentType)])
	// Todo need to think through how to handle oneby/hardtail
	this.bike = new Bike(null, Drivetrain.ONE_BY, Suspension.FULL)
    this.bike.initializeComponents()
	this.selectedComponent = this.bike.components.get(componentType as ComponentType)
	
	this.componentDependencyGroups = new Map()
	this.componentDependencyKeys = []
	this.selectedComponent.getCompatibleDimensions(this.bike).forEach((dimension: CompatibleDimensions) => {
		let dimensionArray: CompatibleDimensions[] = this.componentDependencyGroups.get(dimension.matchComponent);
		if (!dimensionArray) {
			dimensionArray = []
			this.componentDependencyGroups.set(dimension.matchComponent, dimensionArray)
			this.componentDependencyKeys.push(dimension.matchComponent)
		}
		dimensionArray.push(dimension)
	})
  }

  public dimensionKeyConversion(key: DimensionKey): string
  {
	let stringValue: string = key.valueOf().toLowerCase()
	const indexStart = stringValue.indexOf("__")
	stringValue = stringValue.slice(indexStart + 2)
	stringValue = stringValue.replaceAll("_", " ")
	return stringValue
  }

  public generateValues(): void
  {
	this.replacementDimensions = []
	const usedKeys: DimensionKey[] = []
	this.selectedComponent.getCompatibleDimensions(this.bike).forEach((dimension: CompatibleDimensions) => {
		if (dimension.matchDimension.value) {
			if (usedKeys.indexOf(dimension.currentDimension.key) >= 0) {
				if (this.selectedComponent.dimensions.get(dimension.currentDimension.key).value != dimension.matchDimension.value) {
					console.log("ERROR")
				}
			}
			else {
				this.selectedComponent.dimensions.get(dimension.currentDimension.key).value = dimension.matchDimension.value
				usedKeys.push(dimension.currentDimension.key)
				dimension.currentDimension.value = dimension.matchDimension.value
				this.replacementDimensions.push(dimension)
			}
		}
	})
	console.log("bike", this.bike)
  }

}
