import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BikeService } from 'src/app/services/bike.service';
import { Bike, BikeComponent, Drivetrain, Suspension, ComponentType, DimensionKey, OtherComponent } from '../../classes/bike-component';

export enum BikeBuildStep
{
  CHOOSE_DRIVETRAIN,
  CHOOSE_WHEEL_SIZE,
  CHOOSE_SUSPENSION
}

@Component({
  selector: 'app-bike-builder',
  templateUrl: './bike-builder.component.html',
  styleUrls: ['./bike-builder.component.scss']
})
export class BikeBuilderComponent implements OnInit {
  enableDraw : boolean=false;

  public selectedComponent: BikeComponent;
  public selectedOtherComponent: OtherComponent;
  public bike: Bike;

  public drivetrain: Drivetrain = Drivetrain.ONE_BY;
  public suspension: Suspension = Suspension.FULL;

  public currentStep: BikeBuildStep;
  public drivetrains: Drivetrain[] = [Drivetrain.ONE_BY, Drivetrain.TWO_BY];
  public suspensions: Suspension[] = [Suspension.FULL, Suspension.HARDTAIL];

  public userId: string;

  public saving: boolean = false;
  public loading: boolean = false;
  public isUploadingPhoto: boolean = false;
  // public currentCompatibleComponentArray: CompatibleComponent[];

  constructor(private userService: UserService, private bikeService: BikeService,
    private elementRef: ElementRef) {
	}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
		if (user) {
			this.userId = user.uid;
		}
    });

    const bikeId: string = history.state.bikeId;
    // const bikeId: string = "dH5l6L9MnUpiRZih8llO";
    // console.log("bikeId", bikeId);

    if (bikeId) {
      this.loading = true;
      this.bikeService.getBike(bikeId).then((savedBike: Bike) => {
        this.bike = savedBike;
        this.loading = false;
      })
    }
    else {
      this.currentStep = BikeBuildStep.CHOOSE_SUSPENSION;
    }
  }

  public chooseDrivetrain(event: any): void {
    const index: number = Object.values(Drivetrain).indexOf(event.value);
    this.drivetrain = Object.values(Drivetrain)[index];
  }

  public chooseSuspension(event: any): void {
    const index: number = Object.values(Suspension).indexOf(event.value);
    this.suspension = Object.values(Suspension)[index];
  }

  public startBikeBuilding(): void {
    this.bike = new Bike(this.userId, this.drivetrain, this.suspension);
    this.bike.initializeComponents();
  }

  public selectComponent(componentType: any) {
      this.selectedComponent = this.bike.components.get(componentType as ComponentType);
	  if (this.selectedComponent.type === ComponentType.OTHER)
	  {
		this.selectedOtherComponent = this.selectComponent as unknown as OtherComponent;
	  }
      // this.currentCompatibleComponentArray = this.selectedComponent.getCurrentCompatibleStatus(this.bike);
    console.log("selectedComponent", this.selectedComponent)

  }

  public saveCurrentBike() {
    this.bike.calculateTotalWeight();
    this.bike.calculateTotalCost();
    this.saving = true;
    this.bikeService.saveBike(this.bike).then(() => {
      this.saving = false;
    })
  }

  public onComponentCostChange() {
    this.bike.calculateTotalCost();
  }

  public onComponentWeightChange() {
    this.bike.calculateTotalWeight();
  }

  public goToComponent(componentType: any) {
    this.selectedComponent = this.bike.components.get(componentType as ComponentType);
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('.selected').scrollIntoView();
    }, 0)
  }

  public clearCurrentBike() {
    this.bike = null;
    this.selectedComponent = null;
  }

  public uploadPhoto() {
    this.isUploadingPhoto = true;
  }

  public photoUploaded(url: string) {
    this.bike.photoUrl = url;
    this.isUploadingPhoto = false;
  }
}
