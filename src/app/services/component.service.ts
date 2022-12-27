import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Bars, Bike, BikeComponent, Dimension, DimensionKey, BottomBracket, CableEnds,
  CableFerrule, Cassette, Chain, Chainring, ComponentType, Cranks, Derailleur, Fork, Frame,
  FrontBrake, FrontBrakeMountAdapter, FrontDerailleur, FrontRotor, FrontShifter, FrontTire,
  FrontWheel, Grips, HeadsetBottom, HeadsetTop, OtherComponent, RearBrake,
  RearBrakeMountAdapter, RearRotor, RearTire, RearWheel, Sealant, Seat, Seatpost,
  SeatpostLever, Shifter, Shock, Stem, Tubes, Valves } from 'src/app/classes/bike-component';


@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private documentName: string = "components";
  constructor(private firestore: AngularFirestore) { }

  saveBikeComponent(data: BikeComponent) {
    if (!data.id) {
      data.id = this.newId();
    }

    let jsonObject: any = {};  
    data.dimensions.forEach((value: Dimension, key: DimensionKey) => {
      let keyAsString: string = DimensionKey[key];
      const dimensionObjectToSave = JSON.parse(JSON.stringify(value));
        jsonObject[keyAsString] = dimensionObjectToSave  
    });
    const objectToSave = JSON.parse(JSON.stringify(data));
    objectToSave.dimensions = jsonObject;
    return this.firestore
        .collection(this.documentName)
        .doc(data.id)
        .set(objectToSave)
        .then(res => {
          return data.id;
        }, err => {});
  }

  // need a delete by bike id
  deleteBikeComponent(id: string) {
    return this.firestore
        .collection(this.documentName)
        .doc(id)
        .delete()
        .then(res => {
        }, err => {});
  }

  // this method is untested
  public getBikeComponent(bikeComponentId: string, bike: Bike): Promise<any> {
    return new Promise<any>((resolve: (bikeComponent: BikeComponent) => void) => {
      this.firestore
        .collection(this.documentName).doc(bikeComponentId).ref.get().then(function (doc) {
          if (doc.exists) {

            const savedBikeComponentJson: any = doc.data() as any;
            const newBikeComponent: BikeComponent = bike.components.get(savedBikeComponentJson.type);
            const newDimensions: Map<any, Dimension> = new Map();
            newBikeComponent.dimensions.forEach((value: Dimension, key: DimensionKey) => {
              const newDimension: Dimension = value;
              Object.assign(newDimension, savedBikeComponentJson.dimensions[key]);
              newDimensions.set(key, newDimension);
            })
            Object.assign(newBikeComponent, savedBikeComponentJson);

            newBikeComponent.dimensions = newDimensions;
            resolve(newBikeComponent);
          } else {
            // TODO: Add reject statement
            console.log("There is no document!");
          }
      }).catch(function (error) {
        console.log("There was an error getting your document:", error);
      });
    });
  }

  public getBikeComponentsByBikeId(bikeId: string, bike: Bike): Promise<any> {
    return new Promise<any>((resolve: (bikes: BikeComponent[]) => void) => {
      const newBikeComponents: BikeComponent[] = [];
      this.firestore
        .collection(this.documentName, ref => ref.where('bikeId', '==', bikeId)).valueChanges().subscribe((savedBikeComponents: any[]) => {
        savedBikeComponents.forEach((savedBikeComponent: any) => {
          const newBikeComponent: BikeComponent = bike.components.get(savedBikeComponent.type);
          const newDimensions: Map<any, Dimension> = new Map();
          newBikeComponent.dimensions.forEach((value: Dimension, key: DimensionKey) => {
            const newDimension: Dimension = value;
            Object.assign(newDimension, savedBikeComponent.dimensions[key]);
            newDimensions.set(key, newDimension);
          })
          Object.assign(newBikeComponent, savedBikeComponent);

          newBikeComponent.dimensions = newDimensions;
          newBikeComponents.push(newBikeComponent);
        });
        resolve(newBikeComponents);
      });
    });
  }

  public getUnusedBikeComponentsForUser(userId: string): Promise<any> {
    return new Promise<any>((resolve: (bikes: BikeComponent[]) => void) => {
      const newBikeComponents: BikeComponent[] = [];
      this.firestore
        .collection(this.documentName, ref => ref.where('bikeId', '==', null).where('userId', '==', userId)).valueChanges().subscribe((savedBikeComponents: any[]) => {
        savedBikeComponents.forEach((savedBikeComponent: any) => {
          console.log('component', savedBikeComponent);
          const newBikeComponent: BikeComponent = this.selectComponent(userId, savedBikeComponent.type);
          const newDimensions: Map<any, Dimension> = new Map();
          newBikeComponent.dimensions.forEach((value: Dimension, key: DimensionKey) => {
            const newDimension: Dimension = value;
            Object.assign(newDimension, savedBikeComponent.dimensions[key]);
            newDimensions.set(key, newDimension);
          })
          Object.assign(newBikeComponent, savedBikeComponent);

          newBikeComponent.dimensions = newDimensions;
          newBikeComponents.push(newBikeComponent);
        });
        resolve(newBikeComponents);
      });
    });
  }
  
  public newId(): string {
    // Alphanumeric characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
  }

  public selectComponent(userId: string, componentValue: string): BikeComponent {

    let newComponent: BikeComponent;
    switch(componentValue)
    {
      case ComponentType.FRAME: {
          newComponent = new Frame(userId, null, null);
        break;
      }
      case ComponentType.HEADSET_TOP: {
        newComponent = new HeadsetTop(userId, null);
        break;
      }
      case ComponentType.HEADSET_BOTTOM: {
        newComponent = new HeadsetBottom(userId, null);
        break;
      }
      case ComponentType.FORK: {
        newComponent = new Fork(userId, null);
        break;
      }
      case ComponentType.SHOCK: {
        newComponent = new Shock(userId, null);
        break;
      }
      case ComponentType.SEATPOST: {
        newComponent = new Seatpost(userId, null);
        break;
      }
      case ComponentType.SEATPOST_LEVER: {
        newComponent = new SeatpostLever(userId, null);
        break;
      }
      case ComponentType.SEAT: {
        newComponent = new Seat(userId, null);
        break;
      }
      case ComponentType.CRANKS: {
        newComponent = new Cranks(userId, null);
        break;
      }
      case ComponentType.CHAINRING: {
        newComponent = new Chainring(userId, null);
        break;
      }
      case ComponentType.SHIFTER: {
        newComponent = new Shifter(userId, null);
        break;
      }
      case ComponentType.DERAILLEUR: {
        newComponent = new Derailleur(userId, null);
        break;
      }
      case ComponentType.FRONT_SHIFTER: {
        newComponent = new FrontShifter(userId, null);
        break;
      }
      case ComponentType.FRONT_DERAILLEUR: {
        newComponent = new FrontDerailleur(userId, null);
        break;
      }
      case ComponentType.CASSETTE: {
        newComponent = new Cassette(userId, null);
        break;
      }
      case ComponentType.CHAIN: {
        newComponent = new Chain(userId, null);
        break;
      }
      case ComponentType.BOTTOM_BRACKET: {
        newComponent = new BottomBracket(userId, null);
        break;
      }
      case ComponentType.FRONT_BRAKE: {
        newComponent = new FrontBrake(userId, null);
        break;
      }
      case ComponentType.REAR_BRAKE: {
        newComponent = new RearBrake(userId, null);
        break;
      }
      case ComponentType.FRONT_ROTOR: {
        newComponent = new FrontRotor(userId, null);
        break;
      }
      case ComponentType.REAR_ROTOR: {
        newComponent = new RearRotor(userId, null);
        break;
      }
      case ComponentType.FRONT_BRAKE_MOUNT_ADAPTER: {
        newComponent = new FrontBrakeMountAdapter(userId, null);
        break;
      }
      case ComponentType.REAR_BRAKE_MOUNT_ADAPTER: {
        newComponent = new RearBrakeMountAdapter(userId, null);
        break;
      }
      case ComponentType.FRONT_TIRE: {
        newComponent = new FrontTire(userId, null);
        break;
      }
      case ComponentType.REAR_TIRE: {
        newComponent = new RearTire(userId, null);
        break;
      }
      case ComponentType.FRONT_WHEEL: {
        newComponent = new FrontWheel(userId, null);
        break;
      }
      case ComponentType.REAR_WHEEL: {
        newComponent = new RearWheel(userId, null);
        break;
      }
      // case ComponentType.FRONT_HUB: {
      //   newComponent = new front(userId, null);
      //   break;
      // }
      // case ComponentType.REAR_HUB: {
      //   newComponent = new Frame(userId, null);
      //   break;
      // }
      case ComponentType.VALVES: {
        newComponent = new Valves(userId, null);
        break;
      }
      case ComponentType.SEALANT: {
        newComponent = new Sealant(userId, null);
        break;
      }
      case ComponentType.TUBES: {
        newComponent = new Tubes(userId, null);
        break;
      }
      case ComponentType.CABLE_ENDS: {
        newComponent = new CableEnds(userId, null);
        break;
      }
      case ComponentType.CABLE_FERRULE: {
        newComponent = new CableFerrule(userId, null);
        break;
      }
      case ComponentType.BARS: {
        newComponent = new Bars(userId, null);
        break;
      }
      case ComponentType.STEM: {
        newComponent = new Stem(userId, null);
        break;
      }
      case ComponentType.GRIPS: {
        newComponent = new Grips(userId, null);
        break;
      }
      case ComponentType.OTHER: {
        newComponent = new OtherComponent(userId, null);
        break;
      }
    }
    return newComponent;
  }
}