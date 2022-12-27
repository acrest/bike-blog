import { BikeComponent } from "./bike-component";

export class Bike {
    id: string;
    name: string;
    serial: string;
    components: BikeComponent[];
    price: number;
    type: BikeType;
}

enum BikeType {
    MTB_FULL_SUSPENSION,
    MTB_HARDTAIL,
    GRAVEL
}