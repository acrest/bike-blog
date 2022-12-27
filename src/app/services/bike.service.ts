import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Bike, BikeComponent } from '../classes/bike-component';
import { ComponentService } from './component.service';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private documentName: string = "bikes";
  constructor(private firestore: AngularFirestore, private componentService: ComponentService) { }

  saveBike(data: Bike) {
    let bikeId: string = data.id;
    if (!bikeId) {
      bikeId = this.newId();
      data.id = bikeId;
    }

    data.components.forEach((bikeComponent: BikeComponent) => {
      bikeComponent.bikeId = bikeId;
      this.componentService.saveBikeComponent(bikeComponent);
    })

    const objectToSave = JSON.parse(JSON.stringify(data));
    return this.firestore
        .collection(this.documentName)
        .doc(data.id)
        .set(objectToSave)
        .then(res => {
          return data.id;
        }, err => {});
  }

  deleteBike(id: string) {
    return this.firestore
        .collection(this.documentName)
        .doc(id)
        .delete()
        .then(res => {
        }, err => {});
  }

  // public getBike(bikeId: string): Promise<any> {
  //   return new Promise<any>((resolve: (bike: Bike) => void) => {
  //     var docRef = this.firestore.collection(this.documentName).doc(bikeId);
  //     docRef.get().subscribe((savedBike: any) => {
  //         const newBike: Bike = new Bike(null, null, null);
  //         Object.assign(newBike, savedBike);
  //         newBike.initializeComponents();
  //         resolve(newBike);
  //     })
  //   });
  // }


  public getBike(bikeId: string): Promise<any> {
    return new Promise<any>((resolve: (bike: Bike) => void) => {
      this.getBikeDto(bikeId).then((newBike: Bike) => {
        newBike.initializeComponents();
        this.componentService.getBikeComponentsByBikeId(bikeId, newBike).then((bikeComponents: any[]) => {
          newBike.setComponents(bikeComponents);
          resolve(newBike);
        })
      })
    });
  }

  public getBikes(userId: string): Promise<any> {
    return new Promise<any>((resolve: (bikes: Bike[]) => void) => {
      this.getBikeDtos(userId).then((newBikes: Bike[]) => {
        const promises: Promise<any>[] = [];
        newBikes.forEach(async (newBike: Bike) => {
          newBike.initializeComponents();
          await this.componentService.getBikeComponentsByBikeId(newBike.id, newBike).then((bikeComponents: any[]) => {
            newBike.setComponents(bikeComponents);
          })
          resolve(newBikes);
        })
      })
    });
  }


  public getBikeDto(bikeId: string): Promise<any> {
    return new Promise<any>((resolve: (bike: Bike) => void) => {
      this.firestore
        .collection(this.documentName).doc(bikeId).ref.get().then(function (doc) {
          let newBike: Bike = null;
          if (doc.exists) {
            newBike = new Bike(null, null, null);
            Object.assign(newBike, doc.data());
            resolve(newBike);
          } else {
            // TODO: Add reject statement
            console.log("There is no document!");
          }
      }).catch(function (error) {
        console.log("There was an error getting your document:", error);
      });
    });
  }

  public getBikeDtos(userId: string): Promise<any> {
    return new Promise<any>((resolve: (bikes: Bike[]) => void) => {
      const newBikes: Bike[] = [];
      this.firestore
        .collection(this.documentName, ref => ref.where('userId', '==', userId)).valueChanges().subscribe((savedBikes: any[]) => {
        savedBikes.forEach((savedBike: any) => {
          const newBike: Bike = new Bike(null, null, null);
          Object.assign(newBike, savedBike);
          newBikes.push(newBike);
          resolve(newBikes);
        });
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
}
