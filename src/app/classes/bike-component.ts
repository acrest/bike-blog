export class BikeDto {
    public userId: string;
    public id: string;
    public drivetrain: Drivetrain;
    public suspension: Suspension;
    public wheelSize: MTBWheelSize;
    public frameSize: FrameSize;
    public name: string;
    public photoUrl: string;

    public totalCost: number;
    public totalWeightInGrams: number;

    public constructor(userId: string, drivetrain: Drivetrain, suspension: Suspension) {
        this.userId = userId;
        this.drivetrain = drivetrain;
        this.suspension = suspension;
    };
}


export class Bike extends BikeDto {
    public components: Map<string, BikeComponent>;

    public constructor(userId: string, drivetrain: Drivetrain, suspension: Suspension) {
        super (userId, drivetrain, suspension)
    };

    public initializeComponents(): void {

        this.components = new Map();

        this.components.set(ComponentType.FRAME, new Frame(this.userId, this.id, this.suspension));
        this.components.set(ComponentType.HEADSET_TOP, new HeadsetTop(this.userId, this.id));
        this.components.set(ComponentType.HEADSET_BOTTOM, new HeadsetBottom(this.userId, this.id));
        this.components.set(ComponentType.FORK, new Fork(this.userId, this.id));
        this.components.set(ComponentType.SEATPOST, new Seatpost(this.userId, this.id));
        this.components.set(ComponentType.SEATPOST_LEVER, new SeatpostLever(this.userId, this.id));
        this.components.set(ComponentType.SEAT, new Seat(this.userId, this.id));
        this.components.set(ComponentType.CRANKS, new Cranks(this.userId, this.id));
        this.components.set(ComponentType.CHAINRING, new Chainring(this.userId, this.id));
        this.components.set(ComponentType.SHIFTER, new Shifter(this.userId, this.id));
        this.components.set(ComponentType.DERAILLEUR, new Derailleur(this.userId, this.id));
        this.components.set(ComponentType.CASSETTE, new Cassette(this.userId, this.id));
        this.components.set(ComponentType.CHAIN, new Chain(this.userId, this.id));
        this.components.set(ComponentType.BOTTOM_BRACKET, new BottomBracket(this.userId, this.id));
        this.components.set(ComponentType.FRONT_BRAKE, new FrontBrake(this.userId, this.id));
        this.components.set(ComponentType.REAR_BRAKE, new RearBrake(this.userId, this.id));
        this.components.set(ComponentType.FRONT_ROTOR, new FrontRotor(this.userId, this.id));
        this.components.set(ComponentType.REAR_ROTOR, new RearRotor(this.userId, this.id));
        // this.components.set(ComponentType.FRONT_BRAKE_MOUNT_ADAPTER, new FrontBrakeMountAdapter(this.userId, this.id));
        // this.components.set(ComponentType.REAR_BRAKE_MOUNT_ADAPTER, new RearBrakeMountAdapter(this.userId, this.id));
        this.components.set(ComponentType.FRONT_TIRE, new FrontTire(this.userId, this.id));
        this.components.set(ComponentType.REAR_TIRE, new RearTire(this.userId, this.id));
        this.components.set(ComponentType.FRONT_WHEEL, new FrontWheel(this.userId, this.id));
        this.components.set(ComponentType.REAR_WHEEL, new RearWheel(this.userId, this.id));
        this.components.set(ComponentType.VALVES, new Valves(this.userId, this.id));
        this.components.set(ComponentType.SEALANT, new Sealant(this.userId, this.id));

        // Maybe set tubes by asking a question at the beginning of tubeless or tubed
        this.components.set(ComponentType.TUBES, new Tubes(this.userId, this.id));
        this.components.set(ComponentType.CABLE_ENDS, new CableEnds(this.userId, this.id));
        this.components.set(ComponentType.CABLE_FERRULE, new CableFerrule(this.userId, this.id));
        this.components.set(ComponentType.BARS, new Bars(this.userId, this.id));
        this.components.set(ComponentType.STEM, new Stem(this.userId, this.id));
        this.components.set(ComponentType.GRIPS, new Grips(this.userId, this.id));

        if (Drivetrain.TWO_BY === this.drivetrain)
        {
            this.components.set(ComponentType.FRONT_SHIFTER, new FrontShifter(this.userId, this.id));
            this.components.set(ComponentType.FRONT_DERAILLEUR, new FrontDerailleur(this.userId, this.id));
        }

        if (Suspension.FULL === this.suspension)
        {
            this.components.set(ComponentType.SHOCK, new Shock(this.userId, this.id));
        }

        this.components.set(ComponentType.OTHER, new OtherComponent(this.userId, this.id));
    }

    public setComponents(components: BikeComponent[])
    {
        this.components = new Map();
        
        components.forEach((component: BikeComponent) => {
            this.components.set(component.type, component);
        });
    }

    public getDimension(dimensionKey: DimensionKey): Dimension
    {
		const componentTypeString: keyof typeof ComponentType = DimensionKey[dimensionKey].split("__", 1)[0] as keyof typeof  ComponentType;
        const componenentType: ComponentType = ComponentType[componentTypeString];
        const component: BikeComponent = this.components.get(componenentType);
        let dimension: Dimension = null;
        if (component)
        {
            dimension = component.getDimension(dimensionKey);
        }
        return dimension;
    }

    public calculateTotalCost(): void
    {
        let cost: number = 0;
        this.components.forEach((component: BikeComponent) => {
            if (component.cost)
            {
                cost += component.cost;
            }
        })
        this.totalCost = cost;
    }

    public calculateTotalWeight(): void
    {
        let weight: number = 0;
        this.components.forEach((component: BikeComponent) => {
            if (component.weightInGrams)
            {
                weight += component.weightInGrams;
            }
        })
        this.totalWeightInGrams = weight;
    }

    public checkCompatibility(): void
    {
        this.components.forEach((value: BikeComponent, key: string) => {
        })
    }
}

export class BikeComponent {
    public userId: string;
    public id: string;
    public bikeId: string;
    public type: ComponentType;
    public cost: number;
    public year: number;
    public brand: string;
    public model: string;
    public weightInGrams: number;
    public durabilityScore: number;
    public warrantyInYears: number;
    public notes: string;
    public tips: string[];
    public dimensions: Map<any, Dimension>;
    public compatibleDimensions: CompatibleDimensions[];

    public constructor(userId: string, bikeId: string, type: ComponentType) {
        this.userId = userId;
        this.bikeId = bikeId;
        this.type = type;
    }

    public getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        // Every component should override this method
        return [];
    }

    public getIsCompatible(bike: Bike): Compatibility
    {
        let finalStatus: Compatibility = Compatibility.COMPATIBLE;
        const dimensions: CompatibleDimensions[] = this.getCompatibleDimensions(bike);
        dimensions.forEach((dimensions: CompatibleDimensions) => {
            const tempStatus: CompatibleStatus = dimensions.getStatus();
            if (tempStatus === CompatibleStatus.NOT_COMPATIBLE)
            {
                finalStatus = Compatibility.NOT_COMPATIBLE;
            }
            else if (finalStatus === Compatibility.COMPATIBLE)
            {
                if (tempStatus === CompatibleStatus.MISSING_BOTH ||
                    tempStatus === CompatibleStatus.MISSING_CURRENT_DIMENSION ||
                    tempStatus === CompatibleStatus.MISSING_MATCH_DIMENSION)
                {
                    finalStatus = Compatibility.MISSING;
                }
            }
        })
        return finalStatus;
    }

    public getDimension(dimensionKey: DimensionKey): Dimension
    {
        return this.dimensions.get(dimensionKey);
    }
}

export class CompatibleDimensions
{
	public currentComponent: ComponentType;
    public currentDimension: Dimension;
	public matchComponent: ComponentType;
    public matchDimension: Dimension;
    public statusFunction: Function;
    public stringFunction: Function;

    public constructor(currentComponent: ComponentType, currentDimension: Dimension, matchComponent: ComponentType, matchDimension: Dimension, statusFunction: Function, stringFunction: Function)
    {
		this.currentComponent = currentComponent;
        this.currentDimension = currentDimension;
		this.matchComponent = matchComponent;
        this.matchDimension = matchDimension;
        this.statusFunction = statusFunction;
        this.stringFunction = stringFunction;
    }

    public getStatus(): CompatibleStatus
    {
        let status: CompatibleStatus;
        if (this.statusFunction)
        {
            status = this.statusFunction();
        }
        else
        {
            if (this.currentDimension.value && this.matchDimension.value)
            {
                if (this.currentDimension.key === DimensionKey.FRAME__REAR_MAX_ROTOR)
                {
                    if (this.currentDimension.value >= this.matchDimension.value)
                    {
                        status = CompatibleStatus.COMPATIBLE;
                    }
                    else
                    {
                        status = CompatibleStatus.NOT_COMPATIBLE;
                    }
    
                }
                if (this.currentDimension.key === DimensionKey.REAR_ROTOR__SIZE)
                {
                    if (this.currentDimension.value <= this.matchDimension.value)
                    {
                        status = CompatibleStatus.COMPATIBLE;
                    }
                    else
                    {
                        status = CompatibleStatus.NOT_COMPATIBLE;
                    }
    
                }
                if (this.currentDimension.key === DimensionKey.FORK__ROTOR_MAX_SIZE)
                {
                    if (this.currentDimension.value >= this.matchDimension.value)
                    {
                        status = CompatibleStatus.COMPATIBLE;
                    }
                    else
                    {
                        status = CompatibleStatus.NOT_COMPATIBLE;
                    }
    
                }
                if (this.currentDimension.key === DimensionKey.FRONT_ROTOR__SIZE)
                {
                    if (this.currentDimension.value <= this.matchDimension.value)
                    {
                        status = CompatibleStatus.COMPATIBLE;
                    }
                    else
                    {
                        status = CompatibleStatus.NOT_COMPATIBLE;
                    }
    
                }
                else if (this.currentDimension.key === DimensionKey.SEATPOST_LEVER__CABLE_END_TYPE ||
                    this.currentDimension.key === DimensionKey.SEATPOST__CABLE_END_TYPE)
                {
                    if (this.currentDimension.value === this.matchDimension.value)
                    {
                        if (this.currentDimension.value === CableEndType.WIRE)
                        {
                            status = CompatibleStatus.COMPATIBLE;
                        }
                        else
                        {
                            status = CompatibleStatus.NOT_COMPATIBLE;
                        }
                    }
                    else
                    {
                        status = CompatibleStatus.COMPATIBLE;
                    }
                }
                else
                {
                    if (this.currentDimension.value === this.matchDimension.value)
                    {
                        status = CompatibleStatus.COMPATIBLE;
                    }
                    else
                    {
                        status = CompatibleStatus.NOT_COMPATIBLE;
                    }
                }
            }
            else if (!this.currentDimension.value && !this.matchDimension.value)
            {
                status = CompatibleStatus.MISSING_BOTH;
            }
            else if (!!this.currentDimension.value)
            {
                status = CompatibleStatus.MISSING_MATCH_DIMENSION;
            }
            else if (!!this.matchDimension.value)
            {
                status = CompatibleStatus.MISSING_CURRENT_DIMENSION;
            }
        }
        return status;
    }

    public statusString(): string
    {
        let statusString: string;
        if (this.stringFunction)
        {
            statusString = this.stringFunction();
        }
        else
        {
            const status: CompatibleStatus = this.getStatus();
            const currentValue = this.currentDimension.value;
            const matchValue = this.matchDimension.value;
            const currentComponentName = this.currentDimension.belongingComponent;
            const matchComponentName = this.matchDimension.belongingComponent;
            const currentLabel = this.currentDimension.label;
            const matchLabel = this.matchDimension.label;
    
            if (status === CompatibleStatus.COMPATIBLE)
            {
                statusString = currentLabel + " is set to " + currentValue + " which works with the " + matchComponentName + " " + matchLabel;
            }
            else if (status === CompatibleStatus.NOT_COMPATIBLE)
            {
                statusString = currentLabel + " is set to " + currentValue + " but " + matchComponentName + " is set to " + matchValue + " for " + matchLabel;
            }
            else if (status === CompatibleStatus.MISSING_BOTH)
            {
                statusString = "Neither " + currentComponentName + " " + currentLabel + " or " + matchComponentName + " " + matchLabel + " have been set."
            }
            else if (status === CompatibleStatus.MISSING_MATCH_DIMENSION)
            {
                statusString = matchLabel + " is not set for the " + matchComponentName + "."
            }
            else if (status === CompatibleStatus.MISSING_CURRENT_DIMENSION)
            {
                statusString = currentLabel + " is not set for the " + currentComponentName + "."
            }
        }

        return statusString;
    }
}

export class OtherItem
{
    public name: string;
    public brand: string;
    public model: string;
    public weightInGrams: number;
    public cost: number;
    public additionalNotes: string;
}

export class Frame extends BikeComponent {
    public constructor(userId: string, bikeId: string, suspension: Suspension) {
        super(userId, bikeId, ComponentType.FRAME);
        this.dimensions = ComponentDimensions.frameDimensions();
        if (Suspension.HARDTAIL === suspension)
        {
            // set all dimensions for hardtail
            this.dimensions.get(DimensionKey.FRAME__EYE_TO_EYE).setValue(0);
            this.dimensions.get(DimensionKey.FRAME__STROKE_LENGTH).setValue(0);
            this.dimensions.get(DimensionKey.FRAME__REAR_TRAVEL).setValue(0);
        }
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            // Front wheel
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__FRONT_WHEEL_SIZE), ComponentType.FRONT_TIRE, bike.getDimension(DimensionKey.FRONT_TIRE__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__FRONT_WHEEL_SIZE), ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__FRONT_WHEEL_SIZE), ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__FRONT_WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__FRONT_WHEEL_SIZE), ComponentType.FORK, bike.getDimension(DimensionKey.FORK__FRONT_WHEEL_SIZE), null, null),

            // Rear wheel
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_WHEEL_SIZE), ComponentType.REAR_TIRE, bike.getDimension(DimensionKey.REAR_TIRE__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_WHEEL_SIZE), ComponentType.REAR_WHEEL, bike.getDimension(DimensionKey.REAR_WHEEL__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_WHEEL_SIZE), ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__REAR_WHEEL_SIZE), null, null),

            // Headset
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__UPPER_HEADSET_STANDARD), ComponentType.HEADSET_TOP, bike.getDimension(DimensionKey.HEADSET_TOP__STANDARD), null, null),
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__LOWER_HEADSET_STANDARD), ComponentType.HEADSET_BOTTOM, bike.getDimension(DimensionKey.HEADSET_BOTTOM__STANDARD), null, null),

            // Bottom Bracket
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__BB_TYPE), ComponentType.BOTTOM_BRACKET, bike.getDimension(DimensionKey.BOTTOM_BRACKET__TYPE), null, null),
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__BB_TYPE), ComponentType.CRANKS, bike.getDimension(DimensionKey.CRANKS__BOTTOM_BRACKET_TYPE), null, null),

            // Rear Brake
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_BRAKE_MOUNT_TYPE), ComponentType.REAR_BRAKE, bike.getDimension(DimensionKey.REAR_BRAKE__MOUNT_TYPE), null, null),

            // Shock
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__EYE_TO_EYE), ComponentType.SHOCK, bike.getDimension(DimensionKey.SHOCK__EYE_TO_EYE), null, null),
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__STROKE_LENGTH), ComponentType.SHOCK, bike.getDimension(DimensionKey.SHOCK__STROKE), null, null),

            // Axle
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_AXLE), ComponentType.REAR_WHEEL, bike.getDimension(DimensionKey.REAR_WHEEL__AXLE), null, null),

            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__SEATPOST_DIAMETER), ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST__DIAMETER), null, null),

            // Max Rotor
            // TODO: Need to add in potential brake mount adapters
            new CompatibleDimensions(ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_MAX_ROTOR), ComponentType.REAR_ROTOR, bike.getDimension(DimensionKey.REAR_ROTOR__SIZE), null, null),


            // special case for steerer tube
        ];
    }
}

export class HeadsetTop extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.HEADSET_TOP);
        this.dimensions = ComponentDimensions.headsetTopDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.HEADSET_TOP, bike.getDimension(DimensionKey.HEADSET_TOP__STANDARD), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__UPPER_HEADSET_STANDARD), null, null),

            new CompatibleDimensions(ComponentType.HEADSET_TOP, bike.getDimension(DimensionKey.HEADSET_TOP__STEERER_TUBE_DIAMETER), ComponentType.STEM, bike.getDimension(DimensionKey.STEM__STEERER_DIAMETER), null, null),
            new CompatibleDimensions(ComponentType.HEADSET_TOP, bike.getDimension(DimensionKey.HEADSET_TOP__STEERER_TUBE_DIAMETER), ComponentType.FORK, bike.getDimension(DimensionKey.FORK__STEERER_TUBE_TOP_DIAMETER), null, null),
        ];
    }
}

export class HeadsetBottom extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.HEADSET_BOTTOM);
        this.dimensions = ComponentDimensions.headsetBottomDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.HEADSET_BOTTOM, bike.getDimension(DimensionKey.HEADSET_BOTTOM__STANDARD), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__LOWER_HEADSET_STANDARD), null, null),

            new CompatibleDimensions(ComponentType.HEADSET_BOTTOM, bike.getDimension(DimensionKey.HEADSET_BOTTOM__STEERER_TUBE_DIAMETER), ComponentType.FORK, bike.getDimension(DimensionKey.FORK__STEERER_TUBE_BOTTOM_DIAMETER), null, null),
        ];
    }
}

export class Fork extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.FORK);
        this.dimensions = ComponentDimensions.forkDimensions();
		this.tips = [
			"When purchasing a fork, if buying used make sure there is enough of the steer tube left for your current stack (stem, spacers, head tube, etc...)."
		]
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            // Wheel Size
            new CompatibleDimensions(ComponentType.FORK, bike.getDimension(DimensionKey.FORK__FRONT_WHEEL_SIZE), ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__WHEEL_SIZE), null, null),
            // new CompatibleDimensions(ComponentType.FORK, bike.getDimension(DimensionKey.FORK__FRONT_WHEEL_SIZE), ComponentType.FRONT_TIRE, bike.getDimension(DimensionKey.FRONT_TIRE__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FORK, bike.getDimension(DimensionKey.FORK__FRONT_WHEEL_SIZE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__FRONT_WHEEL_SIZE), null, null),
            // new CompatibleDimensions(ComponentType.FORK, bike.getDimension(DimensionKey.FORK__FRONT_WHEEL_SIZE), ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__FRONT_WHEEL_SIZE), null, null),

            // Brake Mount Type
            new CompatibleDimensions(ComponentType.FORK, bike.getDimension(DimensionKey.FORK__BRAKE_MOUNT_TYPE), ComponentType.FRONT_BRAKE, bike.getDimension(DimensionKey.FRONT_BRAKE__MOUNT_TYPE), null, null),

            // Steerer Tube Top Diameter
            new CompatibleDimensions(ComponentType.FORK, bike.getDimension(DimensionKey.FORK__STEERER_TUBE_TOP_DIAMETER), ComponentType.STEM, bike.getDimension(DimensionKey.STEM__STEERER_DIAMETER), null, null),
            new CompatibleDimensions(ComponentType.FORK, bike.getDimension(DimensionKey.FORK__STEERER_TUBE_TOP_DIAMETER), ComponentType.HEADSET_TOP, bike.getDimension(DimensionKey.HEADSET_TOP__STEERER_TUBE_DIAMETER), null, null),

            // Steerer Tube Bottom Diameter
            new CompatibleDimensions(ComponentType.FORK, bike.getDimension(DimensionKey.FORK__STEERER_TUBE_BOTTOM_DIAMETER), ComponentType.HEADSET_BOTTOM, bike.getDimension(DimensionKey.HEADSET_BOTTOM__STEERER_TUBE_DIAMETER), null, null),

            // Steerer Tube Length
            // Special case this

            // Axle
            new CompatibleDimensions(ComponentType.FORK, bike.getDimension(DimensionKey.FORK__AXLE), ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__AXLE), null, null),

            // Rotor
            // TODO: Need to add in potential brake mount adapters
            new CompatibleDimensions(ComponentType.FORK, bike.getDimension(DimensionKey.FORK__ROTOR_MAX_SIZE), ComponentType.FRONT_ROTOR, bike.getDimension(DimensionKey.FRONT_ROTOR__SIZE), null, null),
        ];
    }
}

export class Shock extends BikeComponent {
	// Shock resource: https://canecreek.com/everything-you-need-to-know-about-rear-shocks/
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.SHOCK);
        this.dimensions = ComponentDimensions.shockDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.SHOCK, bike.getDimension(DimensionKey.SHOCK__EYE_TO_EYE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__EYE_TO_EYE), null, null),
            new CompatibleDimensions(ComponentType.SHOCK, bike.getDimension(DimensionKey.SHOCK__STROKE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__STROKE_LENGTH), null, null),
        ];
    }
}

export class Seatpost extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.SEATPOST);
        this.dimensions = ComponentDimensions.seatpostDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            // Frame
            new CompatibleDimensions(ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST__DIAMETER), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__SEATPOST_DIAMETER), null, null),

            // TODO: can force what gets put in the array depending if it is dropper or not
            // Lever
            new CompatibleDimensions(ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST__IS_DROPPER), ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST_LEVER__IS_DROPPER), null, null),
            new CompatibleDimensions(ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST__IS_ELECTRIC), ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST_LEVER__IS_ELECTRIC), null, null),
            new CompatibleDimensions(ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST__CABLE_END_TYPE), ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST_LEVER__CABLE_END_TYPE), null, null),
            
            // TODO: Max insertion needs work
        ];
    }
}

 // How do we pick MatchMakers?
export class SeatpostLever extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.SEATPOST_LEVER);
        this.dimensions = ComponentDimensions.dropperLeverDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        // TODO: can force what gets put in the array depending if it is dropper or not
        return [
            new CompatibleDimensions(ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST_LEVER__IS_DROPPER), ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST__IS_DROPPER), null, null),
            new CompatibleDimensions(ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST_LEVER__IS_ELECTRIC), ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST__IS_ELECTRIC), null, null),
            new CompatibleDimensions(ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST_LEVER__CABLE_END_TYPE), ComponentType.SEATPOST, bike.getDimension(DimensionKey.SEATPOST__CABLE_END_TYPE), null, null),
        ];
    }
}

export class Seat extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.SEAT);
        this.dimensions = ComponentDimensions.seatDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
        ];
    }
}

export class Cranks extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.CRANKS);
        this.dimensions = ComponentDimensions.cranksDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.CRANKS, bike.getDimension(DimensionKey.CRANKS__BOTTOM_BRACKET_TYPE), ComponentType.BOTTOM_BRACKET, bike.getDimension(DimensionKey.BOTTOM_BRACKET__TYPE), null, null),
            new CompatibleDimensions(ComponentType.CRANKS, bike.getDimension(DimensionKey.CRANKS__BOTTOM_BRACKET_TYPE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__BB_TYPE), null, null),

            new CompatibleDimensions(ComponentType.CRANKS, bike.getDimension(DimensionKey.CRANKS__SPINDLE_DIAMETER), ComponentType.BOTTOM_BRACKET, bike.getDimension(DimensionKey.BOTTOM_BRACKET__SPINDLE_DIAMETER), null, null),

            new CompatibleDimensions(ComponentType.CRANKS, bike.getDimension(DimensionKey.CRANKS__BOLT_TYPE), ComponentType.CHAINRING, bike.getDimension(DimensionKey.CHAINRING__BOLT_TYPE), null, null),

            // TODO: need to figure out drivetrain with ring count - Probably need to instantiate different object for 2x and 3x
            // new CompatibleDimensions(ComponentType.CRANKS, bike.getDimension(DimensionKey.CRANKS__RING_COUNT), bike.getDimension(DimensionKey), null, null),
        ];
    }
}


export class Chainring extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.CHAINRING);
        this.dimensions = ComponentDimensions.chainringDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.CHAINRING, bike.getDimension(DimensionKey.CHAINRING__BOLT_TYPE), ComponentType.CRANKS, bike.getDimension(DimensionKey.CRANKS__BOLT_TYPE), null, null),
        ];
    }
}

export class Shifter extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.SHIFTER);
        this.dimensions = ComponentDimensions.shifterDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.SHIFTER, bike.getDimension(DimensionKey.SHIFTER__SPEEDS), ComponentType.CHAIN, bike.getDimension(DimensionKey.CHAIN__SPEEDS), null, null),
            new CompatibleDimensions(ComponentType.SHIFTER, bike.getDimension(DimensionKey.SHIFTER__SPEEDS), ComponentType.CASSETTE, bike.getDimension(DimensionKey.CASSETTE__SPEEDS), null, null),
            new CompatibleDimensions(ComponentType.SHIFTER, bike.getDimension(DimensionKey.SHIFTER__SPEEDS), ComponentType.DERAILLEUR, bike.getDimension(DimensionKey.DERAILLEUR__SPEEDS), null, null),

            new CompatibleDimensions(ComponentType.SHIFTER, bike.getDimension(DimensionKey.SHIFTER__IS_ELECTRIC), ComponentType.DERAILLEUR, bike.getDimension(DimensionKey.DERAILLEUR__IS_ELECTRIC), null, null),
        ];
    }
}

export class FrontShifter extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.SHIFTER);
        this.dimensions = ComponentDimensions.FrontShifterDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            // TODO
        ];
    }
}

export class Derailleur extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.DERAILLEUR);
        this.dimensions = ComponentDimensions.derailleurDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.DERAILLEUR, bike.getDimension(DimensionKey.DERAILLEUR__SPEEDS), ComponentType.CHAIN, bike.getDimension(DimensionKey.CHAIN__SPEEDS), null, null),
            new CompatibleDimensions(ComponentType.DERAILLEUR, bike.getDimension(DimensionKey.DERAILLEUR__SPEEDS), ComponentType.CASSETTE, bike.getDimension(DimensionKey.CASSETTE__SPEEDS), null, null),
            new CompatibleDimensions(ComponentType.DERAILLEUR, bike.getDimension(DimensionKey.DERAILLEUR__SPEEDS), ComponentType.SHIFTER, bike.getDimension(DimensionKey.SHIFTER__SPEEDS), null, null),

            new CompatibleDimensions(ComponentType.DERAILLEUR, bike.getDimension(DimensionKey.DERAILLEUR__IS_ELECTRIC), ComponentType.SHIFTER, bike.getDimension(DimensionKey.SHIFTER__IS_ELECTRIC), null, null),

            new CompatibleDimensions(ComponentType.DERAILLEUR, bike.getDimension(DimensionKey.DERAILLEUR__COVERAGE_PERCENT), ComponentType.CASSETTE, bike.getDimension(DimensionKey.CASSETTE__COVERAGE_PERCENT), null, null),
        ];
    }
}

export class FrontDerailleur extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.FRONT_DERAILLEUR);
        this.dimensions = ComponentDimensions.frontDerailleurDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            // TODO
        ];
    }
}

export class Cassette extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.CASSETTE);
        this.dimensions = ComponentDimensions.cassetteDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.CASSETTE, bike.getDimension(DimensionKey.CASSETTE__SPEEDS), ComponentType.CHAIN, bike.getDimension(DimensionKey.CHAIN__SPEEDS), null, null),
            new CompatibleDimensions(ComponentType.CASSETTE, bike.getDimension(DimensionKey.CASSETTE__SPEEDS), ComponentType.DERAILLEUR, bike.getDimension(DimensionKey.DERAILLEUR__SPEEDS), null, null),
            new CompatibleDimensions(ComponentType.CASSETTE, bike.getDimension(DimensionKey.CASSETTE__SPEEDS), ComponentType.SHIFTER, bike.getDimension(DimensionKey.SHIFTER__SPEEDS), null, null),

            new CompatibleDimensions(ComponentType.CASSETTE, bike.getDimension(DimensionKey.CASSETTE__COVERAGE_PERCENT), ComponentType.DERAILLEUR, bike.getDimension(DimensionKey.DERAILLEUR__COVERAGE_PERCENT), null, null),
        ];
    }
}

export class Chain extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.CHAIN);
        this.dimensions = ComponentDimensions.chainDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.CHAIN, bike.getDimension(DimensionKey.CHAIN__SPEEDS), ComponentType.DERAILLEUR, bike.getDimension(DimensionKey.DERAILLEUR__SPEEDS), null, null),
            new CompatibleDimensions(ComponentType.CHAIN, bike.getDimension(DimensionKey.CHAIN__SPEEDS), ComponentType.CASSETTE, bike.getDimension(DimensionKey.CASSETTE__SPEEDS), null, null),
            new CompatibleDimensions(ComponentType.CHAIN, bike.getDimension(DimensionKey.CHAIN__SPEEDS), ComponentType.SHIFTER, bike.getDimension(DimensionKey.SHIFTER__SPEEDS), null, null),
        ];
    }
}

export class BottomBracket extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.BOTTOM_BRACKET);
        this.dimensions = ComponentDimensions.bottomBracketDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.BOTTOM_BRACKET, bike.getDimension(DimensionKey.BOTTOM_BRACKET__TYPE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__BB_TYPE), null, null),
            new CompatibleDimensions(ComponentType.BOTTOM_BRACKET, bike.getDimension(DimensionKey.BOTTOM_BRACKET__TYPE), ComponentType.CRANKS, bike.getDimension(DimensionKey.CRANKS__BOTTOM_BRACKET_TYPE), null, null),
        ];
    }
}

export class FrontBrake extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.FRONT_BRAKE);
        this.dimensions = ComponentDimensions.frontBrakeDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.FRONT_BRAKE, bike.getDimension(DimensionKey.FRONT_BRAKE__MOUNT_TYPE), ComponentType.FORK, bike.getDimension(DimensionKey.FORK__BRAKE_MOUNT_TYPE), null, null),
        ];
    }
}

export class RearBrake extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.REAR_BRAKE);
        this.dimensions = ComponentDimensions.rearBrakeDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.REAR_BRAKE, bike.getDimension(DimensionKey.REAR_BRAKE__MOUNT_TYPE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_BRAKE_MOUNT_TYPE), null, null),
        ];
    }
}

export class FrontRotor extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.FRONT_ROTOR);
        this.dimensions = ComponentDimensions.frontRotorDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            // TODO: Need to add in potential brake mount adapters
            new CompatibleDimensions(ComponentType.FRONT_ROTOR, bike.getDimension(DimensionKey.FRONT_ROTOR__SIZE), ComponentType.FORK, bike.getDimension(DimensionKey.FORK__ROTOR_MAX_SIZE), null, null),
        ];
    }
}

export class RearRotor extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.REAR_ROTOR);
        this.dimensions = ComponentDimensions.rearRotorDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            // TODO: Need to add in potential brake mount adapters
            new CompatibleDimensions(ComponentType.REAR_ROTOR, bike.getDimension(DimensionKey.REAR_ROTOR__SIZE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_MAX_ROTOR), null, null),
        ];
    }
}

// export class FrontBrakeMountAdapter extends BikeComponent {
//     public constructor(userId: string, bikeId: string) {
//         super(userId, bikeId, ComponentType.FRONT_BRAKE_MOUNT_ADAPTER, [ComponentType.FRONT_ROTOR]);
//     }
// }

// export class RearBrakeMountAdapter extends BikeComponent {
//     public constructor(userId: string, bikeId: string) {
//         super(userId, bikeId, ComponentType.REAR_BRAKE_MOUNT_ADAPTER, [ComponentType.REAR_ROTOR]);
//     }
// }

export class FrontTire extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.FRONT_TIRE);
        this.dimensions = ComponentDimensions.frontTireDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.FRONT_TIRE, bike.getDimension(DimensionKey.FRONT_TIRE__WHEEL_SIZE), ComponentType.FORK, bike.getDimension(DimensionKey.FORK__FRONT_WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRONT_TIRE, bike.getDimension(DimensionKey.FRONT_TIRE__WHEEL_SIZE), ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRONT_TIRE, bike.getDimension(DimensionKey.FRONT_TIRE__WHEEL_SIZE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__FRONT_WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRONT_TIRE, bike.getDimension(DimensionKey.FRONT_TIRE__WHEEL_SIZE), ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__FRONT_WHEEL_SIZE), null, null),
        ];
    }
}

export class RearTire extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.REAR_TIRE);
        this.dimensions = ComponentDimensions.rearTireDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.REAR_TIRE, bike.getDimension(DimensionKey.REAR_TIRE__WHEEL_SIZE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.REAR_TIRE, bike.getDimension(DimensionKey.REAR_TIRE__WHEEL_SIZE), ComponentType.REAR_WHEEL, bike.getDimension(DimensionKey.REAR_WHEEL__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.REAR_TIRE, bike.getDimension(DimensionKey.REAR_TIRE__WHEEL_SIZE), ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__REAR_WHEEL_SIZE), null, null),
        ];
    }
}

export class FrontWheel extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.FRONT_WHEEL);
        this.dimensions = ComponentDimensions.frontWheelDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__WHEEL_SIZE), ComponentType.FORK, bike.getDimension(DimensionKey.FORK__FRONT_WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__WHEEL_SIZE), ComponentType.FRONT_TIRE, bike.getDimension(DimensionKey.FRONT_TIRE__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__WHEEL_SIZE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__FRONT_WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__WHEEL_SIZE), ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__FRONT_WHEEL_SIZE), null, null),

            new CompatibleDimensions(ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__MOUNT_TYPE), ComponentType.FRONT_TIRE, bike.getDimension(DimensionKey.FRONT_TIRE__MOUNT_TYPE), null, null),

            new CompatibleDimensions(ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__AXLE), ComponentType.FORK, bike.getDimension(DimensionKey.FORK__AXLE), null, null),

            //TODO: brake type (disk rim)
        ];
    }
}

export class RearWheel extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.REAR_WHEEL);
        this.dimensions = ComponentDimensions.rearWheelDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.REAR_WHEEL, bike.getDimension(DimensionKey.REAR_WHEEL__WHEEL_SIZE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.REAR_WHEEL, bike.getDimension(DimensionKey.REAR_WHEEL__WHEEL_SIZE), ComponentType.REAR_TIRE, bike.getDimension(DimensionKey.REAR_TIRE__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.REAR_WHEEL, bike.getDimension(DimensionKey.REAR_WHEEL__WHEEL_SIZE), ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__REAR_WHEEL_SIZE), null, null),

            new CompatibleDimensions(ComponentType.REAR_WHEEL, bike.getDimension(DimensionKey.REAR_WHEEL__MOUNT_TYPE), ComponentType.REAR_TIRE, bike.getDimension(DimensionKey.REAR_TIRE__MOUNT_TYPE), null, null),

            new CompatibleDimensions(ComponentType.REAR_WHEEL, bike.getDimension(DimensionKey.REAR_WHEEL__AXLE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_AXLE), null, null),

            //TODO: brake type (disk rim)
        ];
    }
}

export class FrontBrakeMountAdapter extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.FRONT_BRAKE_MOUNT_ADAPTER);
        this.dimensions = ComponentDimensions.frontBrakeMountAdapterDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [];
    }
}

export class RearBrakeMountAdapter extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.REAR_BRAKE_MOUNT_ADAPTER);
        this.dimensions = ComponentDimensions.rearBrakeMountAdapterDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [];
    }
}

export class Valves extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.VALVES);
        this.dimensions = ComponentDimensions.valvesDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
        ];
    }
}

export class Sealant extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.SEALANT);
        this.dimensions = ComponentDimensions.sealantDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
        ];
    }
}

export class Tubes extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.TUBES);
        this.dimensions = ComponentDimensions.tubesDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__FRONT_WHEEL_SIZE), ComponentType.FORK, bike.getDimension(DimensionKey.FORK__FRONT_WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__FRONT_WHEEL_SIZE), ComponentType.FRONT_TIRE, bike.getDimension(DimensionKey.FRONT_TIRE__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__FRONT_WHEEL_SIZE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__FRONT_WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__FRONT_WHEEL_SIZE), ComponentType.FRONT_WHEEL, bike.getDimension(DimensionKey.FRONT_WHEEL__WHEEL_SIZE), null, null),

            new CompatibleDimensions(ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__REAR_WHEEL_SIZE), ComponentType.FRAME, bike.getDimension(DimensionKey.FRAME__REAR_WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__REAR_WHEEL_SIZE), ComponentType.REAR_TIRE, bike.getDimension(DimensionKey.REAR_TIRE__WHEEL_SIZE), null, null),
            new CompatibleDimensions(ComponentType.TUBES, bike.getDimension(DimensionKey.TUBES__REAR_WHEEL_SIZE), ComponentType.REAR_WHEEL, bike.getDimension(DimensionKey.REAR_WHEEL__WHEEL_SIZE), null, null),
        ];
    }
}

export class CableEnds extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.CABLE_ENDS);
        this.dimensions = ComponentDimensions.cableEndsDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
        ];
    }
}

export class CableFerrule extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.CABLE_FERRULE);
        this.dimensions = ComponentDimensions.FerruleDimensions();
    }

    // calculate quantity
    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
        ];
    }
}

export class Bars extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.BARS);
        this.dimensions = ComponentDimensions.barsDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.BARS, bike.getDimension(DimensionKey.BARS__CLAMP_DIAMETER), ComponentType.STEM, bike.getDimension(DimensionKey.STEM__CLAMP_DIAMETER), null, null),
        ];
    }
}

export class Stem extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.STEM);
        this.dimensions = ComponentDimensions.stemDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [
            new CompatibleDimensions(ComponentType.STEM, bike.getDimension(DimensionKey.STEM__CLAMP_DIAMETER), ComponentType.BARS, bike.getDimension(DimensionKey.BARS__CLAMP_DIAMETER), null, null),
            new CompatibleDimensions(ComponentType.STEM, bike.getDimension(DimensionKey.STEM__STEERER_DIAMETER), ComponentType.FORK, bike.getDimension(DimensionKey.FORK__STEERER_TUBE_TOP_DIAMETER), null, null),
            new CompatibleDimensions(ComponentType.STEM, bike.getDimension(DimensionKey.STEM__STEERER_DIAMETER), ComponentType.HEADSET_TOP, bike.getDimension(DimensionKey.HEADSET_TOP__STEERER_TUBE_DIAMETER), null, null),
        ];
    }
}

export class Grips extends BikeComponent {
    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.GRIPS);
        this.dimensions = ComponentDimensions.gripsDimensions();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [];
    }
}

export class OtherComponent extends BikeComponent {
    public items: OtherItem[];
    public itemToBeAdded: OtherItem;

    public constructor(userId: string, bikeId: string) {
        super(userId, bikeId, ComponentType.OTHER);
        this.dimensions = ComponentDimensions.otherDimensions();
        this.items = [];
        this.itemToBeAdded = new OtherItem();
    }

    public calculateTotals(): void
    {
        let totalWeight: number = 0;
        let totalCost: number = 0;
        this.items.forEach((item: OtherItem) => {
            totalWeight += item.weightInGrams;
            totalCost += item.cost
        })

        this.weightInGrams = totalWeight;
        this.cost = totalCost;
    }

    public addItemToArray(): void
    {
        this.items.push(this.itemToBeAdded);
        this.itemToBeAdded = new OtherItem();
        this.calculateTotals();
    }

    public removeItemFromArray(index: number): void
    {
        this.items.splice(index);
        this.calculateTotals();
    }

    public override getCompatibleDimensions(bike: Bike): CompatibleDimensions[]
    {
        return [];
    }
}

export class Dimension {
    public key: DimensionKey;
    public belongingComponent: ComponentType;
    public isCompatible: boolean;
    public type: DimensionType
    public label: string;
    public placeholder: string;
    public unit: DimensionUnits;
    public value: any;
    public keys: string[];
    public values: any[];

    public constructor(key: DimensionKey, belongingComponent: ComponentType, type: DimensionType,
        label: string, placeholder: string, unit: DimensionUnits)
    {
        this.key = key;
        this.belongingComponent = belongingComponent;
        this.type = type;
        this.label = label;
        this.placeholder = placeholder;
        this.unit = unit;

        // defaults
        this.isCompatible = false;
    }

    public getColor(): string
    {
        if (!this.value)
        {
            return "yellow";
        }
        else if (this.isCompatible)
        {
            return "green";
        }
        else
        {
            return "red";
        }
    }

    public setValue(newValue: any)
    {
        this.value = newValue;
    }
}

// ENUMS

export enum Drivetrain {
    ONE_BY = "1x (One By - No front derailleur)",
    TWO_BY = "2X (Two By - Has front derailleur)",
    OTHER = "Other - Specify in notes"
}

export enum FrameMaterial {
    ALUMINUM = "Aluminum",
    CARBON = "Carbon",
    OTHER = "Other - Specify in notes"
}

export enum FrameSize {
    X_SMALL = "Extra Small",
    SMALL = "Small",
    MEDIUM = "Medium",
    LARGE = "Large",
    X_LARGE = "Extra Large",
    S1 = "S1 (Specialized)",
    S2 = "S2 (Specialized)",
    S3 = "S3 (Specialized)",
    S4 = "S4 (Specialized)",
    S5 = "S5 (Specialized)",
    S6 = "S6 (Specialized)",
    OTHER = "Other - Specify in notes"
}

export enum MTBWheelSize {
    TWENTY_NINE = "29",
    TWENTY_SEVEN_FIVE = "27.5",
    TWENTY_SEVEN_FIVE_PLUS = "27.5+",
    TWENTY_SIX = "26",
    TWENTY_FOUR = "24",
    OTHER = "Other - Specify in notes"
}

export enum BBType {
    SM_BB52 = "SM-BB52",
    SRAM_DUB = "SRAM DUB",
    BB_MT800 = "BB-MT800",
    CONVENTIONAL_THREADED = "Conventional Threaded",
    BB90_BB95 = "BB90 - BB95",
    PF86_PF92 = "PF86 - PF92",
    BB30 = "BB30",
    BB30A_BB30_83_AI = "BB30A BB30 83 AI",
    PF30 = "PF30",
    OSBB_MTB = "OSBB MTB",
    PF30A_PF30_83 = "PF30A_PF30_83",
    BB_RIGHT = "BB RIGHT",
    BB386_EVO = "BB386 EVO",
    T47 = "T47",
    THREADFIT_82_5 = "THREADFIT 82.5",
    OTHER = "Other - Specify in notes"
}

export enum CompatibleStatus
{
    COMPATIBLE = "COMPATIBLE",
    NOT_COMPATIBLE = "NOT_COMPATIBLE",
    MISSING_CURRENT_DIMENSION = "MISSING_CURRENT_DIMENSION",
    MISSING_MATCH_DIMENSION = "MISSING_MATCH_DIMENSION",
    MISSING_BOTH = "MISSING_BOTH"
}

export enum Compatibility
{
    COMPATIBLE = "COMPATIBLE",
    NOT_COMPATIBLE = "NOT_COMPATIBLE",
    MISSING = "MISSING"
}

export enum HeadsetType {
    CONV_THREADED = "Threaded",
    CONV_THREADLESS = "Threadless",
    LOW_PROFILE = "Zero-Stack or Internal", //Zero-Stack or Internal
    INTEGRATED_SYSTEM = "Integrated",
    MICROTECH = "Microtech",
    COLUMBUS = "Columbus",
    CAMPAGNOLO = "Campagnolo",
    ONE_POINT_FIVE = "1.5"
}

export enum YesOrNo {
    YES = "Yes",
    NO = "No"
}

export enum CableEndType {
    KNOB = "Knob",
    WIRE = "Wire"
}

export enum BrakeMountType {
   IS = "International Standard (IS)",
   POST_MOUNT = "Post Mount",
   OTHER = "Other - Specify in notes"
}

export enum BrakeClampType {
    DISK = "Disk",
    RIM = "Rim",
}

export enum FerruleType {
    SHIFT = "4mm Shifter",
    BRAKE = "5mm Brake",
}

export enum HeadsetStandard {
    EC29 = "EC29",
    EC30 = "EC30",
    EC33 = "EC33",
    EC34 = "EC34",
    EC37 = "EC37",
    EC44 = "EC44",
    EC49 = "EC49",
    EC56 = "EC56",
    ZS41 = "ZS41",
    ZS44 = "ZS44",
    ZS49 = "ZS49",
    ZS55 = "ZS55",
    ZS56 = "ZS56",
    IS38 = "IS38",
    IS41 = "IS41",
    IS42 = "IS42",
    IS47 = "IS47",
    IS49 = "IS49",
    IS52 = "IS52",
    OTHER = "Other - Specify in notes"
}

export enum CrankBoltType {
    DIRECT_MOUNT = "Direct Mount",
    OTHER = "Other - Specify in notes"
}

export enum SpindleType {
    SRAM_DUB = "SRAM DUB",
    TWENTY_FOUR_MM = "24mm",
    OTHER = "Other - Specify in notes"
}

export enum RotorMountType {
    CENTERLOCK = "Centerlock",
    SIX_BOLT = "6 Bolt",
    OTHER = "Other - Specify in notes"
}

export enum RotorSizes {
    ONE_FIFTY = "160mm",
    ONE_SIXTY = "170mm",
    ONE_SEVENTY = "180mm",
    ONE_EIGHTY = "190mm",
    TWO_HUNDRED = "200mm",
    TWO_TEN = "210mm",
    OTHER = "Other - Specify in notes"
}

export enum TireType {
    TUBELESS = "Tubeless Ready",
    CLINCHER = "Clincher",
    OTHER = "Other - Specify in notes"
}

export enum DriverType {
    SRAM_HD = "SRAM HD",
    MICROSPLINE = "Shimano Microspline",
    OTHER = "Other - Specify in notes"
}

export enum FrontAxle {
ONE_HUNDRED_LEFTY = "100 Lefty",
ONE_HUNDRED_QR = "100 QR",
TWELVE_BY_HUNDRED = "12 X 100 TA",
FIFTEEN_BY_ONE_HUNDRED = "15 X 100 TA",
FIFTEEN_BY_ONE_TEN_BOOST = "15 X 110 TA Boost",
FIFTEEN_BY_ONE_FIFTY = "15 X 150 TA",
TWENTY_BY_ONE_FIFTY = "20 X 110 TA",
OTHER = "Other - Specify in notes"
}

export enum RearAxle {
    // TODO: need to get these dimensions
OTHER = "Other - Specify in notes"
}

export enum ClampSize {
    THIRTY_ONE_EIGHT = "31.8mm",
    THIRTY_FIVE = "35"
}

export enum DimensionType
{
    ENUM = "ENUM",
    NUMBER = "NUMBER",
    STRING = "STRING",
    OTHER = "Other - Specify in notes"
}

export enum DimensionUnits
{
    MILIMETER = "mm",
    INCH = "in.",
    CENTIMETER = "cm",
    DEGREES = "°",
    LBS = "lbs.",
    GRAMS = "gm",
    DOLLARS = "$",
    NUMBER = "",
    PERCENT = "%",
    NONE = ""
}

export enum ComponentType {
    FRAME = "Frame",
    HEADSET_TOP = "Top Headset",
    HEADSET_BOTTOM = "Bottom Headset",
    FORK = "Fork",
    SHOCK = "Shock",
    SEATPOST = "Seatpost",
    SEATPOST_LEVER = "Seatpost Lever",
    SEAT = "Seat",
    CRANKS = "Cranks",
    CHAINRING = "Chainring",
    SHIFTER = "Shifter",
    DERAILLEUR = "Derailleur",
    FRONT_SHIFTER = "Front Shifter",
    FRONT_DERAILLEUR = "Front Derailleur",
    CASSETTE = "Cassette",
    CHAIN = "Chain",
    BOTTOM_BRACKET = "Bottom Bracket",
    FRONT_BRAKE = "Front Brake",
    REAR_BRAKE = "Rear Brake",
    FRONT_ROTOR = "Front Rotor",
    REAR_ROTOR = "Rear Rotor",
    FRONT_BRAKE_MOUNT_ADAPTER = "Front Brake Mount Adapter",
    REAR_BRAKE_MOUNT_ADAPTER = "Rear Brake Mount Adapter",
    FRONT_TIRE = "Front Tire",
    REAR_TIRE = "Rear Tire",
    FRONT_WHEEL = "Front Wheel",
    REAR_WHEEL = "Rear Wheel",
    // FRONT_HUB = "Front Hub",
    // REAR_HUB = "Rear Hub",
    VALVES = "Valves",
    SEALANT = "Sealant",
    TUBES = "Tubes",
    CABLE_ENDS = "Cable Ends",
    CABLE_FERRULE = "Cable Ferrules",
    BARS = "Bars",
    STEM = "Stem",
    GRIPS = "Grips",
    OTHER = "Other"
}


export enum Suspension {
    FULL = "Full Suspension",
    HARDTAIL = "Hardtail",
    OTHER = "Other - Specify in notes"
}

export enum DimensionKey
{
    BIKE_OTHER = "BIKE_OTHER",

    FRAME__MATERIAL = "FRAME__MATERIAL",
    FRAME__SIZE = "FRAME__SIZE",
    FRAME__FRONT_WHEEL_SIZE = "FRAME__FRONT_WHEEL_SIZE",
    FRAME__REAR_WHEEL_SIZE = "FRAME__REAR_WHEEL_SIZE",
    FRAME__UPPER_HEADSET_STANDARD = "FRAME__UPPER_HEADSET_STANDARD",
    FRAME__LOWER_HEADSET_STANDARD = "FRAME__LOWER_HEADSET_STANDARD",
    FRAME__BB_TYPE = "FRAME__BB_TYPE",
    FRAME__REAR_BRAKE_MOUNT_TYPE = "FRAME__REAR_BRAKE_MOUNT_TYPE",
    FRAME__EYE_TO_EYE = "FRAME__EYE_TO_EYE",
    FRAME__STROKE_LENGTH = "FRAME__STROKE_LENGTH",
    FRAME__REAR_TRAVEL = "FRAME__REAR_TRAVEL",
    FRAME__REAR_AXLE = "FRAME__REAR_AXLE",
    FRAME__SEATPOST_DIAMETER = "FRAME__SEATPOST_DIAMETER",
    FRAME__SEATPOST_MAX_INSERTION = "FRAME__SEATPOST_MAX_INSERTION",
    FRAME__REAR_MAX_ROTOR = "FRAME__REAR_MAX_ROTOR",
    FRAME__CHAINSTAY_LENGTH = "FRAME__CHAINSTAY_LENGTH",
    FRAME__BB_HEIGHT = "FRAME__BB_HEIGHT",
    FRAME__BB_DROP = "FRAME__BB_DROP",
    FRAME__STANDOVER_HEIGHT = "FRAME__STANDOVER_HEIGHT",
    FRAME__WHEELBASE = "FRAME__WHEELBASE",
    FRAME__CHAINLINE_FROM_CENTER = "FRAME__CHAINLINE_FROM_CENTER",
    FRAME__CHAINLINE_Q_FACTOR = "FRAME__CHAINLINE_Q_FACTOR",
    FRAME__WARRANTY_YEARS = "FRAME__WARRANTY_YEARS",
    FRAME__TOP_TUBE_LENGTH = "FRAME__TOP_TUBE_LENGTH",
    FRAME__HEAD_TUBE_ANGLE = "FRAME__HEAD_TUBE_ANGLE",
    FRAME__SEAT_TUBE_ANGLE = "FRAME__SEAT_TUBE_ANGLE",
    FRAME__REACH = "FRAME__REACH",
    FRAME__STACK_HEIGHT = "FRAME__STACK_HEIGHT",
    FRAME__HEADSET_TYPE = "FRAME__HEADSET_TYPE",

    HEADSET_TOP__STANDARD = "HEADSET_TOP__STANDARD",
    HEADSET_TOP__STEMP_CLAMP_DIAMETER = "HEADSET_TOP__STEMP_CLAMP_DIAMETER",
    HEADSET_TOP__STEERER_TUBE_DIAMETER = "HEADSET_TOP__STEERER_TUBE_DIAMETER",
    HEADSET_TOP__STACK_HEIGHT = "HEADSET_TOP__STACK_HEIGHT",
    HEADSET_TOP__TYPE = "HEADSET_TOP__TYPE",

    HEADSET_BOTTOM__STANDARD = "HEADSET_BOTTOM__STANDARD",
    HEADSET_BOTTOM__STEMP_CLAMP_DIAMETER = "HEADSET_BOTTOM__STEMP_CLAMP_DIAMETER",
    HEADSET_BOTTOM__STEERER_TUBE_DIAMETER = "HEADSET_BOTTOM__STEERER_TUBE_DIAMETER",
    HEADSET_BOTTOM__STACK_HEIGHT = "HEADSET_BOTTOM__STACK_HEIGHT",
    HEADSET_BOTTOM__TYPE = "HEADSET_BOTTOM__TYPE",

    FORK__FRONT_WHEEL_SIZE = "FORK__FRONT_WHEEL_SIZE",
    FORK__BRAKE_MOUNT_TYPE = "FORK__BRAKE_MOUNT_TYPE",
    FORK__TRAVEL = "FORK__TRAVEL",
    FORK__TYPE = "FORK__TYPE",
    FORK__DAMPER = "FORK__DAMPER",
    FORK__STANCHION = "FORK__STANCHION",
    FORK__LOWER_MATERIAL = "FORK__LOWER_MATERIAL",
    FORK__CROWN_MATERIAL = "FORK__CROWN_MATERIAL",
    FORK__STEERER_TUBE_TOP_DIAMETER = "FORK__STEERER_TUBE_TOP_DIAMETER",
    FORK__STEERER_TUBE_BOTTOM_DIAMETER = "FORK__STEERER_TUBE_BOTTOM_DIAMETER",
    FORK__STEERER_TUBE_LENGTH = "FORK__STEERER_TUBE_LENGTH",
    FORK__STANCHION_DIAMETER = "FORK__STANCHION_DIAMETER",
    FORK__RAKE = "FORK__RAKE",
    FORK__AXLE = "FORK__AXLE",
    FORK__ROTOR_MAX_SIZE = "FORK__ROTOR_MAX_SIZE",

    SHOCK__EYE_TO_EYE = "SHOCK__EYE_TO_EYE",
    SHOCK__DIAMETER = "SHOCK__DIAMETER",
    SHOCK__STROKE = "SHOCK__STROKE",

    SEATPOST__MATERIAL = "SEATPOST__MATERIAL",
    SEATPOST__TRAVEL = "SEATPOST__TRAVEL",
    SEATPOST__LENGTH = "SEATPOST__LENGTH",
    SEATPOST__OFFSET = "SEATPOST__OFFSET",
    SEATPOST__IS_DROPPER = "SEATPOST__IS_DROPPER",
    SEATPOST__IS_ELECTRIC = "SEATPOST__IS_ELECTRIC",
    SEATPOST__DIAMETER = "SEATPOST__DIAMETER",
    SEATPOST__CABLE_END_TYPE = "SEATPOST__CABLE_END_TYPE",

    SEATPOST_LEVER__CABLE_END_TYPE = "SEATPOST_LEVER__CABLE_END_TYPE",
    SEATPOST_LEVER__IS_ELECTRIC = "SEATPOST_LEVER__IS_ELECTRIC",
    SEATPOST_LEVER__IS_DROPPER = "SEATPOST_LEVER__IS_DROPPER",

    SEAT__RAIL_MATERIAL = "SEAT__RAIL_MATERIAL",
    SEAT__LENGTH = "SEAT__LENGTH",
    SEAT__WIDTH = "SEAT__WIDTH",

    CRANKS__BOTTOM_BRACKET_TYPE = "CRANKS__BOTTOM_BRACKET_TYPE",
    CRANKS__SPINDLE_DIAMETER = "CRANKS__SPINDLE_DIAMETER",
    CRANKS__SPINDLE = "CRANKS__SPINDLE",
    CRANKS__BOLT_TYPE = "CRANKS__BOLT_TYPE",
    CRANKS__MATERIAL = "CRANKS__MATERIAL",
    CRANKS__ARM_LENGTH = "CRANKS__ARM_LENGTH",
    CRANKS__RING_COUNT = "CRANKS__RING_COUNT",
    CRANKS__CHAINLINE = "CRANKS__CHAINLINE",
    CRANKS__Q_FACTOR = "CRANKS__Q_FACTOR",
    CRANKS__SPINDLE_LENGTH = "CRANKS__SPINDLE_LENGTH",

    CHAINRING__BOLT_TYPE = "CHAINRING__BOLT_TYPE",
    CHAINRING__TOOTH_COUNT = "CHAINRING__TOOTH_COUNT",
    CHAINRING__OVAL_OFFSET = "CHAINRING__OVAL_OFFSET",
    CHAINRING__MATERIAL = "CHAINRING__MATERIAL",

    SHIFTER__SPEEDS = "SHIFTER__SPEEDS",
    SHIFTER__IS_ELECTRIC = "SHIFTER__IS_ELECTRIC",

    FRONT_SHIFTER__SPEEDS = "FRONT_SHIFTER__SPEEDS",
    FRONT_SHIFTER__IS_ELECTRIC = "FRONT_SHIFTER__IS_ELECTRIC",

    DERAILLEUR__SPEEDS = "DERAILLEUR__SPEEDS",
    DERAILLEUR__IS_ELECTRIC = "DERAILLEUR__IS_ELECTRIC",
    DERAILLEUR__COVERAGE_PERCENT = "DERAILLEUR__COVERAGE_PERCENT",

    FRONT_DERAILLEUR__SPEEDS = "FRONT_DERAILLEUR__SPEEDS",
    FRONT_DERAILLEUR__IS_ELECTRIC = "FRONT_DERAILLEUR__IS_ELECTRIC",

    CASSETTE__SPEEDS = "CASSETTE__SPEEDS",
    CASSETTE__LARGEST_COG = "CASSETTE__LARGEST_COG",
    CASSETTE__SMALLEST_COG = "CASSETTE__SMALLEST_COG",
    CASSETTE__COVERAGE_PERCENT = "CASSETTE__COVERAGE_PERCENT",

    CHAIN__SPEEDS = "CHAIN__SPEEDS",

    BOTTOM_BRACKET__TYPE = "BOTTOM_BRACKET__TYPE",
    BOTTOM_BRACKET__SPINDLE_DIAMETER = "BOTTOM_BRACKET__SPINDLE_DIAMETER",

    FRONT_BRAKE__MOUNT_TYPE = "FRONT_BRAKE__MOUNT_TYPE",
    FRONT_BRAKE__PISTON_COUNT = "FRONT_BRAKE__PISTON_COUNT",
    FRONT_BRAKE__FLUID_TYPE = "FRONT_BRAKE__FLUID_TYPE",

    REAR_BRAKE__MOUNT_TYPE = "REAR_BRAKE__MOUNT_TYPE",
    REAR_BRAKE__PISTON_COUNT = "REAR_BRAKE__PISTON_COUNT",
    REAR_BRAKE__FLUID_TYPE = "REAR_BRAKE__FLUID_TYPE",

    FRONT_ROTOR__SIZE = "FRONT_ROTOR__SIZE",
    FRONT_ROTOR__MOUNT_TYPE = "FRONT_ROTOR__MOUNT_TYPE",

    REAR_ROTOR__SIZE = "REAR_ROTOR__SIZE",
    REAR_ROTOR__MOUNT_TYPE = "REAR_ROTOR__MOUNT_TYPE",

    FRONT_TIRE__MOUNT_TYPE = "FRONT_TIRE__MOUNT_TYPE",
    FRONT_TIRE__WHEEL_SIZE = "FRONT_TIRE__WHEEL_SIZE",
    FRONT_TIRE__WIDTH = "FRONT_TIRE__WIDTH",

    REAR_TIRE__MOUNT_TYPE = "REAR_TIRE__MOUNT_TYPE",
    REAR_TIRE__WHEEL_SIZE = "REAR_TIRE__WHEEL_SIZE",
    REAR_TIRE__WIDTH = "REAR_TIRE__WIDTH",

    FRONT_WHEEL__MOUNT_TYPE = "FRONT_WHEEL__MOUNT_TYPE",
    FRONT_WHEEL__WHEEL_SIZE = "FRONT_WHEEL__WHEEL_SIZE",
    FRONT_WHEEL__INTERNAL_WIDTH = "FRONT_WHEEL__INTERNAL_WIDTH",
    FRONT_WHEEL__SPOKE_COUNT = "FRONT_WHEEL__SPOKE_COUNT",
    FRONT_WHEEL__MATERIAL = "FRONT_WHEEL__MATERIAL",
    FRONT_WHEEL__HUB = "FRONT_WHEEL__HUB",
    FRONT_WHEEL__BRAKE_CLAMP_TYPE = "FRONT_WHEEL__BRAKE_CLAMP_TYPE",
    FRONT_WHEEL__AXLE = "FRONT_WHEEL__AXLE",

    REAR_WHEEL__MOUNT_TYPE = "REAR_WHEEL__MOUNT_TYPE",
    REAR_WHEEL__WHEEL_SIZE = "REAR_WHEEL__WHEEL_SIZE",
    REAR_WHEEL__INTERNAL_WIDTH = "REAR_WHEEL__INTERNAL_WIDTH",
    REAR_WHEEL__SPOKE_COUNT = "REAR_WHEEL__SPOKE_COUNT",
    REAR_WHEEL__MATERIAL = "REAR_WHEEL__MATERIAL",
    REAR_WHEEL__HUB = "REAR_WHEEL__HUB",
    REAR_WHEEL__BRAKE_CLAMP_TYPE = "REAR_WHEEL__BRAKE_CLAMP_TYPE",
    REAR_WHEEL__AXLE = "REAR_WHEEL__AXLE",

    VALVES__LENGTH = "VALVES__LENGTH",

    SEALANT__COLOR = "SEALANT__COLOR",

    TUBES__FRONT_WHEEL_SIZE = "TUBES__FRONT_WHEEL_SIZE",
    TUBES__REAR_WHEEL_SIZE = "TUBES__REAR_WHEEL_SIZE",
    
    CABLE_ENDS__SIZE = "CABLE_ENDS__SIZE",
    CABLE_ENDS__QUANTITY = "CABLE_ENDS__QUANTITY",

    FERRULE__SIZE = "FERRULE__SIZE",

    BARS__CLAMP_DIAMETER = "BARS__CLAMP_DIAMETER",
    BARS__LENGTH = "BARS__LENGTH",
    BARS__RISE = "BARS__RISE",
    BARS__MATERIAL = "BARS__MATERIAL",

    STEM__CLAMP_DIAMETER = "STEM__CLAMP_DIAMETER",
    STEM__STEERER_DIAMETER = "STEM__STEERER_DIAMETER",
    STEM__MATERIAL = "STEM__MATERIAL",

    GRIPS__MATERIAL = "GRIPS__MATERIAL"
}

export class EnumDimension extends Dimension
{
    public override value: any;
    public override keys: string[];
    public override values: any[];

    public constructor(key: DimensionKey, belongingComponent: ComponentType, label: string, placeholder: string,
        unit: DimensionUnits, keys: string[], values: any[])
    {
        super(key, belongingComponent, DimensionType.ENUM, label, placeholder, unit);
        this.keys = keys;
        this.values = values;
    }
}

export class StringDimension extends Dimension
{
    public override value: string;

    public constructor(key: DimensionKey, belongingComponent: ComponentType, label: string, placeholder: string,
        unit: DimensionUnits)
    {
        super(key, belongingComponent, DimensionType.STRING, label, placeholder, unit);
    }
}

export class NumberDimension extends Dimension
{
    public override value: number;

    public constructor(key: DimensionKey, belongingComponent: ComponentType, label: string, placeholder: string,
        unit: DimensionUnits)
    {
        super(key, belongingComponent, DimensionType.NUMBER, label, placeholder, unit);
    }
}

export abstract class ComponentDimensions
{
    public static otherDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([]);
    }

    public static frameDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.FRAME__MATERIAL, new EnumDimension(DimensionKey.FRAME__MATERIAL, ComponentType.FRAME, "Material", "", DimensionUnits.NONE, Object.keys(FrameMaterial), Object.values(FrameMaterial))],
        [DimensionKey.FRAME__SIZE, new EnumDimension(DimensionKey.FRAME__SIZE, ComponentType.FRAME, "Size", "", DimensionUnits.NONE, Object.keys(FrameSize), Object.values(FrameSize))],
        [DimensionKey.FRAME__FRONT_WHEEL_SIZE, new EnumDimension(DimensionKey.FRAME__FRONT_WHEEL_SIZE, ComponentType.FRAME, "Front Wheel Size", "", DimensionUnits.NONE, Object.keys(MTBWheelSize), Object.values(MTBWheelSize))],
        [DimensionKey.FRAME__REAR_WHEEL_SIZE, new EnumDimension(DimensionKey.FRAME__REAR_WHEEL_SIZE, ComponentType.FRAME, "Rear Wheel Size", "", DimensionUnits.NONE, Object.keys(MTBWheelSize), Object.values(MTBWheelSize))],
        [DimensionKey.FRAME__UPPER_HEADSET_STANDARD, new EnumDimension(DimensionKey.FRAME__UPPER_HEADSET_STANDARD, ComponentType.FRAME, "Headset Upper Standard", "", DimensionUnits.NONE, Object.keys(HeadsetStandard), Object.values(HeadsetStandard))],
        [DimensionKey.FRAME__LOWER_HEADSET_STANDARD, new EnumDimension(DimensionKey.FRAME__LOWER_HEADSET_STANDARD, ComponentType.FRAME, "Headset Lower Standard", "", DimensionUnits.NONE, Object.keys(HeadsetStandard), Object.values(HeadsetStandard))],
        [DimensionKey.FRAME__BB_TYPE, new EnumDimension(DimensionKey.FRAME__BB_TYPE, ComponentType.FRAME, "Bottom Bracket Standard", "", DimensionUnits.NONE, Object.keys(BBType), Object.values(BBType))],
        [DimensionKey.FRAME__REAR_BRAKE_MOUNT_TYPE, new EnumDimension(DimensionKey.FRAME__REAR_BRAKE_MOUNT_TYPE, ComponentType.FRAME, "Brake Mount Type", "", DimensionUnits.NONE, Object.keys(BrakeMountType), Object.values(BrakeMountType))],
        [DimensionKey.FRAME__EYE_TO_EYE, new NumberDimension(DimensionKey.FRAME__EYE_TO_EYE, ComponentType.FRAME, "Shock Eye to Eye", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__STROKE_LENGTH, new NumberDimension(DimensionKey.FRAME__STROKE_LENGTH, ComponentType.FRAME, "Shock Stroke Length", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__REAR_TRAVEL, new NumberDimension(DimensionKey.FRAME__REAR_TRAVEL, ComponentType.FRAME, "Rear Travel", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__REAR_AXLE, new EnumDimension(DimensionKey.FRAME__REAR_AXLE, ComponentType.FRAME, "Rear Axle", "", DimensionUnits.NONE, Object.keys(RearAxle), Object.values(RearAxle))],
        [DimensionKey.FRAME__SEATPOST_DIAMETER, new NumberDimension(DimensionKey.FRAME__SEATPOST_DIAMETER, ComponentType.FRAME, "Seatpost Diameter", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__SEATPOST_MAX_INSERTION, new NumberDimension(DimensionKey.FRAME__SEATPOST_MAX_INSERTION, ComponentType.FRAME, "Seatpost Max Insertion", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__REAR_MAX_ROTOR, new NumberDimension(DimensionKey.FRAME__REAR_MAX_ROTOR, ComponentType.FRAME, "Max Rotor Size", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__CHAINSTAY_LENGTH, new NumberDimension(DimensionKey.FRAME__CHAINSTAY_LENGTH, ComponentType.FRAME, "Chainstay Length", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__BB_HEIGHT, new NumberDimension(DimensionKey.FRAME__BB_HEIGHT, ComponentType.FRAME, "Bottom Bracket Height", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__BB_DROP, new NumberDimension(DimensionKey.FRAME__BB_DROP, ComponentType.FRAME, "Bottom Bracket Drop", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__STANDOVER_HEIGHT, new NumberDimension(DimensionKey.FRAME__STANDOVER_HEIGHT, ComponentType.FRAME, "Standover Height", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__WHEELBASE, new NumberDimension(DimensionKey.FRAME__WHEELBASE, ComponentType.FRAME, "Wheelbase", "", DimensionUnits.INCH)],
        [DimensionKey.FRAME__CHAINLINE_FROM_CENTER, new NumberDimension(DimensionKey.FRAME__CHAINLINE_FROM_CENTER, ComponentType.FRAME, "Chainline From Center", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__CHAINLINE_Q_FACTOR, new NumberDimension(DimensionKey.FRAME__CHAINLINE_Q_FACTOR, ComponentType.FRAME, "Chainline Q Factor", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__WARRANTY_YEARS, new NumberDimension(DimensionKey.FRAME__WARRANTY_YEARS, ComponentType.FRAME, "Warranty (years)", "", DimensionUnits.NONE)],
        [DimensionKey.FRAME__TOP_TUBE_LENGTH, new NumberDimension(DimensionKey.FRAME__TOP_TUBE_LENGTH, ComponentType.FRAME, "Top Tube Length", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__HEAD_TUBE_ANGLE, new NumberDimension(DimensionKey.FRAME__HEAD_TUBE_ANGLE, ComponentType.FRAME, "Head Tube Angle", "", DimensionUnits.DEGREES)],
        [DimensionKey.FRAME__SEAT_TUBE_ANGLE, new NumberDimension(DimensionKey.FRAME__SEAT_TUBE_ANGLE, ComponentType.FRAME, "Seat Tube Angle", "", DimensionUnits.DEGREES)],
        [DimensionKey.FRAME__REACH, new NumberDimension(DimensionKey.FRAME__REACH, ComponentType.FRAME, "Reach", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__STACK_HEIGHT, new NumberDimension(DimensionKey.FRAME__STACK_HEIGHT, ComponentType.FRAME, "Stack Height", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRAME__HEADSET_TYPE, new EnumDimension(DimensionKey.FRAME__HEADSET_TYPE, ComponentType.FRAME, "Headset Type", "", DimensionUnits.NONE, Object.keys(HeadsetType), Object.values(HeadsetType))],
        ]);
    }

    public static headsetTopDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.HEADSET_TOP__STANDARD, new EnumDimension(DimensionKey.HEADSET_TOP__STANDARD, ComponentType.HEADSET_TOP, "Standard", "", DimensionUnits.NONE, Object.keys(HeadsetStandard), Object.values(HeadsetStandard))],
        [DimensionKey.HEADSET_TOP__STEERER_TUBE_DIAMETER, new NumberDimension(DimensionKey.HEADSET_TOP__STEERER_TUBE_DIAMETER, ComponentType.HEADSET_TOP, "Steerer Tube Diameter (Top)", "", DimensionUnits.MILIMETER)],
        [DimensionKey.HEADSET_TOP__STACK_HEIGHT, new NumberDimension(DimensionKey.HEADSET_TOP__STACK_HEIGHT, ComponentType.HEADSET_TOP, "Height", "", DimensionUnits.MILIMETER)],
        [DimensionKey.HEADSET_TOP__TYPE, new EnumDimension(DimensionKey.HEADSET_TOP__TYPE, ComponentType.HEADSET_TOP, "Type", "", DimensionUnits.NONE, Object.keys(HeadsetType), Object.values(HeadsetType))],
        ]);
    }

    public static headsetBottomDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.HEADSET_BOTTOM__STANDARD, new EnumDimension(DimensionKey.HEADSET_BOTTOM__STANDARD, ComponentType.HEADSET_BOTTOM, "Standard", "", DimensionUnits.NONE, Object.keys(HeadsetStandard), Object.values(HeadsetStandard))],
        [DimensionKey.HEADSET_BOTTOM__STEERER_TUBE_DIAMETER, new NumberDimension(DimensionKey.HEADSET_BOTTOM__STEERER_TUBE_DIAMETER, ComponentType.HEADSET_BOTTOM, "Steerer Tube Diameter (Bottom)", "", DimensionUnits.MILIMETER)],
        [DimensionKey.HEADSET_BOTTOM__STACK_HEIGHT, new NumberDimension(DimensionKey.HEADSET_BOTTOM__STACK_HEIGHT, ComponentType.HEADSET_BOTTOM, "Height", "", DimensionUnits.MILIMETER)],
        [DimensionKey.HEADSET_BOTTOM__TYPE, new EnumDimension(DimensionKey.HEADSET_BOTTOM__TYPE, ComponentType.HEADSET_BOTTOM, "Type", "", DimensionUnits.NONE, Object.keys(HeadsetType), Object.values(HeadsetType))],
        ]);
    }

    public static forkDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.FORK__FRONT_WHEEL_SIZE, new EnumDimension(DimensionKey.FORK__FRONT_WHEEL_SIZE, ComponentType.FORK, "Front Wheel Size", "", DimensionUnits.NONE, Object.keys(MTBWheelSize), Object.values(MTBWheelSize))],
        [DimensionKey.FORK__BRAKE_MOUNT_TYPE, new EnumDimension(DimensionKey.FORK__BRAKE_MOUNT_TYPE, ComponentType.FORK, "Front Brake Mount Type", "", DimensionUnits.NONE, Object.keys(BrakeMountType), Object.values(BrakeMountType))],
        [DimensionKey.FORK__TRAVEL, new NumberDimension(DimensionKey.FORK__TRAVEL, ComponentType.FORK, "Travel", "160", DimensionUnits.MILIMETER)],
        // [DimensionKey.FORK__TYPE, new NumberDimension(DimensionKey.FORK__TYPE, ComponentType.FORK, "Eye to Eye Length", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FORK__DAMPER, new StringDimension(DimensionKey.FORK__DAMPER, ComponentType.FORK, "Damper", "Grip 2", DimensionUnits.NONE)],
        // [DimensionKey.FORK__STANCHION, new NumberDimension(DimensionKey.FORK__STANCHION, ComponentType.FORK, "Eye to Eye Length", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FORK__LOWER_MATERIAL, new StringDimension(DimensionKey.FORK__LOWER_MATERIAL, ComponentType.FORK, "Lower Material", "", DimensionUnits.NONE)],
        [DimensionKey.FORK__CROWN_MATERIAL, new StringDimension(DimensionKey.FORK__CROWN_MATERIAL, ComponentType.FORK, "Crown Material", "", DimensionUnits.NONE)],
        [DimensionKey.FORK__STEERER_TUBE_TOP_DIAMETER, new NumberDimension(DimensionKey.FORK__STEERER_TUBE_TOP_DIAMETER, ComponentType.FORK, "Steerer Tube Top Diameter", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FORK__STEERER_TUBE_BOTTOM_DIAMETER, new NumberDimension(DimensionKey.FORK__STEERER_TUBE_BOTTOM_DIAMETER, ComponentType.FORK, "Steerer Tube Bottom Diameter", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FORK__STEERER_TUBE_LENGTH, new NumberDimension(DimensionKey.FORK__STEERER_TUBE_LENGTH, ComponentType.FORK, "Steerer Tube Length", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FORK__STANCHION_DIAMETER, new NumberDimension(DimensionKey.FORK__STANCHION_DIAMETER, ComponentType.FORK, "Stanchion Diameter", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FORK__RAKE, new NumberDimension(DimensionKey.FORK__RAKE, ComponentType.FORK, "Rake", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FORK__AXLE, new EnumDimension(DimensionKey.FORK__AXLE, ComponentType.FORK, "Axle", "", DimensionUnits.NONE, Object.keys(FrontAxle), Object.values(FrontAxle))],
        [DimensionKey.FORK__ROTOR_MAX_SIZE, new NumberDimension(DimensionKey.FORK__ROTOR_MAX_SIZE, ComponentType.FORK, "Rotor Max Size", "", DimensionUnits.MILIMETER)],
        ]);
    }

    public static shockDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.SHOCK__EYE_TO_EYE, new NumberDimension(DimensionKey.SHOCK__EYE_TO_EYE, ComponentType.SHOCK, "Eye to Eye Length", "", DimensionUnits.MILIMETER)],
        [DimensionKey.SHOCK__DIAMETER, new NumberDimension(DimensionKey.SHOCK__DIAMETER, ComponentType.SHOCK, "Stanchion Diameter", "", DimensionUnits.MILIMETER)],
        [DimensionKey.SHOCK__STROKE, new NumberDimension(DimensionKey.SHOCK__STROKE, ComponentType.SHOCK, "Stroke Length", "", DimensionUnits.MILIMETER)],
        ]);
    }

    public static seatpostDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.SEATPOST__MATERIAL, new StringDimension(DimensionKey.SEATPOST__MATERIAL, ComponentType.SEATPOST, "Material", "", DimensionUnits.NONE)],
        [DimensionKey.SEATPOST__TRAVEL, new NumberDimension(DimensionKey.SEATPOST__TRAVEL, ComponentType.SEATPOST, "Dropper Travel", "", DimensionUnits.MILIMETER)],
        [DimensionKey.SEATPOST__LENGTH, new NumberDimension(DimensionKey.SEATPOST__LENGTH, ComponentType.SEATPOST, "Full Length", "", DimensionUnits.MILIMETER)],
        [DimensionKey.SEATPOST__OFFSET, new NumberDimension(DimensionKey.SEATPOST__OFFSET, ComponentType.SEATPOST, "Offset", "", DimensionUnits.MILIMETER)],
        [DimensionKey.SEATPOST__IS_DROPPER, new EnumDimension(DimensionKey.SEATPOST__IS_DROPPER, ComponentType.SEATPOST, "Is Dropper Post", "", DimensionUnits.NONE, Object.keys(YesOrNo), Object.values(YesOrNo))],
        [DimensionKey.SEATPOST__IS_ELECTRIC, new EnumDimension(DimensionKey.SEATPOST__IS_ELECTRIC, ComponentType.SEATPOST, "Is Electric", "", DimensionUnits.NONE, Object.keys(YesOrNo), Object.values(YesOrNo))],
        [DimensionKey.SEATPOST__DIAMETER, new NumberDimension(DimensionKey.SEATPOST__DIAMETER, ComponentType.SEATPOST, "Seatpost Insertion Diameter", "", DimensionUnits.MILIMETER)],
        [DimensionKey.SEATPOST__CABLE_END_TYPE, new EnumDimension(DimensionKey.SEATPOST__CABLE_END_TYPE, ComponentType.SEATPOST, "Cable End Type", "", DimensionUnits.NONE, Object.keys(CableEndType), Object.values(CableEndType))],
        ]);
    }

    public static dropperLeverDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.SEATPOST_LEVER__IS_DROPPER, new EnumDimension(DimensionKey.SEATPOST_LEVER__IS_DROPPER, ComponentType.SEATPOST_LEVER, "Is Dropper", "", DimensionUnits.NONE, Object.keys(YesOrNo), Object.values(YesOrNo))],
        [DimensionKey.SEATPOST_LEVER__CABLE_END_TYPE, new EnumDimension(DimensionKey.SEATPOST_LEVER__CABLE_END_TYPE, ComponentType.SEATPOST_LEVER, "Cable End Type", "", DimensionUnits.NONE, Object.keys(CableEndType), Object.values(CableEndType))],
        [DimensionKey.SEATPOST_LEVER__IS_ELECTRIC, new EnumDimension(DimensionKey.SEATPOST_LEVER__IS_ELECTRIC, ComponentType.SEATPOST_LEVER, "Is Electric", "", DimensionUnits.NONE, Object.keys(YesOrNo), Object.values(YesOrNo))],
        ]);
    }

    public static seatDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.SEAT__RAIL_MATERIAL, new StringDimension(DimensionKey.SEAT__RAIL_MATERIAL, ComponentType.SEAT, "Material", "", DimensionUnits.NONE)],
        [DimensionKey.SEAT__LENGTH, new NumberDimension(DimensionKey.SEAT__LENGTH, ComponentType.SEAT, "Length", "", DimensionUnits.MILIMETER)],
        [DimensionKey.SEAT__WIDTH, new NumberDimension(DimensionKey.SEAT__WIDTH, ComponentType.SEAT, "Width", "", DimensionUnits.MILIMETER)],
        ]);
    }

    public static cranksDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.CRANKS__BOTTOM_BRACKET_TYPE, new EnumDimension(DimensionKey.CRANKS__BOTTOM_BRACKET_TYPE, ComponentType.CRANKS, "Bottom Bracket Type", "", DimensionUnits.NONE, Object.keys(BBType), Object.values(BBType))],
        [DimensionKey.CRANKS__SPINDLE_DIAMETER, new NumberDimension(DimensionKey.CRANKS__SPINDLE_DIAMETER, ComponentType.CRANKS, "Spindle Diameter", "", DimensionUnits.MILIMETER)],
        [DimensionKey.CRANKS__BOLT_TYPE, new EnumDimension(DimensionKey.CRANKS__BOLT_TYPE, ComponentType.CRANKS, "Bolt Type", "", DimensionUnits.NONE, Object.keys(CrankBoltType), Object.values(CrankBoltType))],
        [DimensionKey.CRANKS__MATERIAL, new StringDimension(DimensionKey.CRANKS__MATERIAL, ComponentType.CRANKS, "Material", "", DimensionUnits.NONE)],
        [DimensionKey.CRANKS__ARM_LENGTH, new NumberDimension(DimensionKey.CRANKS__ARM_LENGTH, ComponentType.CRANKS, "Arm Length", "", DimensionUnits.MILIMETER)],
        [DimensionKey.CRANKS__RING_COUNT, new NumberDimension(DimensionKey.CRANKS__RING_COUNT, ComponentType.CRANKS, "Ring Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.CRANKS__CHAINLINE, new NumberDimension(DimensionKey.CRANKS__CHAINLINE, ComponentType.CRANKS, "Chainline", "", DimensionUnits.MILIMETER)],
        [DimensionKey.CRANKS__Q_FACTOR, new NumberDimension(DimensionKey.CRANKS__Q_FACTOR, ComponentType.CRANKS, "Q Factor", "", DimensionUnits.MILIMETER)],
        [DimensionKey.CRANKS__SPINDLE_LENGTH, new EnumDimension(DimensionKey.CRANKS__SPINDLE_LENGTH, ComponentType.CRANKS, "Length", "", DimensionUnits.NONE, Object.keys(SpindleType), Object.values(SpindleType))],
        ]);
    }

    public static chainringDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.CHAINRING__BOLT_TYPE, new EnumDimension(DimensionKey.CHAINRING__BOLT_TYPE, ComponentType.CHAINRING, "Bolt Type", "", DimensionUnits.NONE, Object.keys(CrankBoltType), Object.values(CrankBoltType))],
        [DimensionKey.CHAINRING__TOOTH_COUNT, new NumberDimension(DimensionKey.CHAINRING__TOOTH_COUNT, ComponentType.CHAINRING, "Tooth Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.CHAINRING__OVAL_OFFSET, new NumberDimension(DimensionKey.CHAINRING__OVAL_OFFSET, ComponentType.CHAINRING, "Oval Offset", "", DimensionUnits.MILIMETER)],
        [DimensionKey.CHAINRING__MATERIAL, new StringDimension(DimensionKey.CHAINRING__MATERIAL, ComponentType.CHAINRING, "Material", "", DimensionUnits.NONE)],
        ]);
    }

    public static shifterDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.SHIFTER__SPEEDS, new NumberDimension(DimensionKey.SHIFTER__SPEEDS, ComponentType.SHIFTER, "Gear Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.SHIFTER__IS_ELECTRIC, new EnumDimension(DimensionKey.SHIFTER__IS_ELECTRIC, ComponentType.SHIFTER, "Is Electric", "", DimensionUnits.NONE, Object.keys(YesOrNo), Object.values(YesOrNo))],
        ]);
    }

    public static derailleurDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.DERAILLEUR__SPEEDS, new NumberDimension(DimensionKey.DERAILLEUR__SPEEDS, ComponentType.DERAILLEUR, "Gear Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.DERAILLEUR__IS_ELECTRIC, new EnumDimension(DimensionKey.DERAILLEUR__IS_ELECTRIC, ComponentType.DERAILLEUR, "Is Electric", "", DimensionUnits.NONE, Object.keys(YesOrNo), Object.values(YesOrNo))],
        [DimensionKey.DERAILLEUR__COVERAGE_PERCENT, new NumberDimension(DimensionKey.DERAILLEUR__COVERAGE_PERCENT, ComponentType.DERAILLEUR, "Coverate Percent", "520%", DimensionUnits.PERCENT)],
        ]);
    }

    public static FrontShifterDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.FRONT_SHIFTER__SPEEDS, new NumberDimension(DimensionKey.FRONT_SHIFTER__SPEEDS, ComponentType.FRONT_SHIFTER, "Gear Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.FRONT_SHIFTER__IS_ELECTRIC, new EnumDimension(DimensionKey.FRONT_SHIFTER__IS_ELECTRIC, ComponentType.FRONT_SHIFTER, "Is Electric", "", DimensionUnits.NONE, Object.keys(YesOrNo), Object.values(YesOrNo))],
        ]);
    }

    public static frontDerailleurDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.FRONT_DERAILLEUR__SPEEDS, new NumberDimension(DimensionKey.FRONT_DERAILLEUR__SPEEDS, ComponentType.FRONT_DERAILLEUR, "Gear Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.FRONT_DERAILLEUR__IS_ELECTRIC, new EnumDimension(DimensionKey.FRONT_DERAILLEUR__IS_ELECTRIC, ComponentType.FRONT_DERAILLEUR, "Is Electric", "", DimensionUnits.NONE, Object.keys(YesOrNo), Object.values(YesOrNo))],
        ]);
    }

    public static cassetteDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.CASSETTE__SPEEDS, new NumberDimension(DimensionKey.CASSETTE__SPEEDS, ComponentType.CASSETTE, "Gear Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.CASSETTE__LARGEST_COG, new NumberDimension(DimensionKey.CASSETTE__LARGEST_COG, ComponentType.CASSETTE, "Largest Cog Tooth Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.CASSETTE__SMALLEST_COG, new NumberDimension(DimensionKey.CASSETTE__SMALLEST_COG, ComponentType.CASSETTE, "Smallest Cog Tooth Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.CASSETTE__COVERAGE_PERCENT, new NumberDimension(DimensionKey.CASSETTE__COVERAGE_PERCENT, ComponentType.CASSETTE, "Coverage Percent", "", DimensionUnits.NUMBER)],
        ]);
    }

    public static chainDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.CHAIN__SPEEDS, new NumberDimension(DimensionKey.CHAIN__SPEEDS, ComponentType.CHAIN, "Gear Count", "12 Speed", DimensionUnits.NUMBER)],
        ]);
    }

    public static bottomBracketDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.BOTTOM_BRACKET__TYPE, new EnumDimension(DimensionKey.BOTTOM_BRACKET__TYPE, ComponentType.BOTTOM_BRACKET, "Type", "", DimensionUnits.NONE, Object.keys(BBType), Object.values(BBType))],
        [DimensionKey.BOTTOM_BRACKET__SPINDLE_DIAMETER, new NumberDimension(DimensionKey.BOTTOM_BRACKET__SPINDLE_DIAMETER, ComponentType.BOTTOM_BRACKET, "Spindle Diameter", "", DimensionUnits.MILIMETER)],
        ]);
    }

    public static frontBrakeDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.FRONT_BRAKE__MOUNT_TYPE, new EnumDimension(DimensionKey.FRONT_BRAKE__MOUNT_TYPE, ComponentType.FRONT_BRAKE, "Mount Type", "", DimensionUnits.NONE, Object.keys(BrakeMountType), Object.values(BrakeMountType))],
        [DimensionKey.FRONT_BRAKE__PISTON_COUNT, new NumberDimension(DimensionKey.FRONT_BRAKE__PISTON_COUNT, ComponentType.FRONT_BRAKE, "Piston Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.FRONT_BRAKE__FLUID_TYPE, new StringDimension(DimensionKey.FRONT_BRAKE__FLUID_TYPE, ComponentType.FRONT_BRAKE, "Fluid Type", "", DimensionUnits.NONE)],
        ]);
    }

    public static rearBrakeDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.REAR_BRAKE__MOUNT_TYPE, new EnumDimension(DimensionKey.REAR_BRAKE__MOUNT_TYPE, ComponentType.REAR_BRAKE, "Mount Type", "", DimensionUnits.NONE, Object.keys(BrakeMountType), Object.values(BrakeMountType))],
        [DimensionKey.REAR_BRAKE__PISTON_COUNT, new NumberDimension(DimensionKey.REAR_BRAKE__PISTON_COUNT, ComponentType.REAR_BRAKE, "Piston Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.REAR_BRAKE__FLUID_TYPE, new StringDimension(DimensionKey.REAR_BRAKE__FLUID_TYPE, ComponentType.REAR_BRAKE, "Fluid Type", "", DimensionUnits.NONE)],
        ]);
    }

    public static frontRotorDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.FRONT_ROTOR__SIZE, new NumberDimension(DimensionKey.FRONT_ROTOR__SIZE, ComponentType.FRONT_ROTOR, "Diameter", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRONT_ROTOR__MOUNT_TYPE, new EnumDimension(DimensionKey.FRONT_ROTOR__MOUNT_TYPE, ComponentType.FRONT_ROTOR, "Mount Type", "", DimensionUnits.NONE, Object.keys(RotorMountType), Object.values(RotorMountType))],
        ]);
    }

    public static rearRotorDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.REAR_ROTOR__SIZE, new NumberDimension(DimensionKey.REAR_ROTOR__SIZE, ComponentType.REAR_ROTOR, "Diameter", "", DimensionUnits.MILIMETER)],
        [DimensionKey.REAR_ROTOR__MOUNT_TYPE, new EnumDimension(DimensionKey.REAR_ROTOR__MOUNT_TYPE, ComponentType.REAR_ROTOR, "Mount Type", "", DimensionUnits.NONE, Object.keys(RotorMountType), Object.values(RotorMountType))],
        ]);
    }

    public static frontTireDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.FRONT_TIRE__MOUNT_TYPE, new EnumDimension(DimensionKey.FRONT_TIRE__MOUNT_TYPE, ComponentType.FRONT_TIRE, "Type", "", DimensionUnits.NONE, Object.keys(TireType), Object.values(TireType))],
        [DimensionKey.FRONT_TIRE__WHEEL_SIZE, new EnumDimension(DimensionKey.FRONT_TIRE__WHEEL_SIZE, ComponentType.FRONT_TIRE, "Wheel Size", "", DimensionUnits.NONE, Object.keys(MTBWheelSize), Object.values(MTBWheelSize))],
        [DimensionKey.FRONT_TIRE__WIDTH, new NumberDimension(DimensionKey.FRONT_TIRE__WIDTH, ComponentType.FRONT_TIRE, "Width", "", DimensionUnits.MILIMETER)],
        ]);
    }

    public static rearTireDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.REAR_TIRE__MOUNT_TYPE, new EnumDimension(DimensionKey.REAR_TIRE__MOUNT_TYPE, ComponentType.REAR_TIRE, "Type", "", DimensionUnits.NONE, Object.keys(TireType), Object.values(TireType))],
        [DimensionKey.REAR_TIRE__WHEEL_SIZE, new EnumDimension(DimensionKey.REAR_TIRE__WHEEL_SIZE, ComponentType.REAR_TIRE, "Wheel Size", "", DimensionUnits.NONE, Object.keys(MTBWheelSize), Object.values(MTBWheelSize))],
        [DimensionKey.REAR_TIRE__WIDTH, new NumberDimension(DimensionKey.REAR_TIRE__WIDTH, ComponentType.REAR_TIRE, "Width", "", DimensionUnits.MILIMETER)],
        ]);
    }

    public static frontWheelDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.FRONT_WHEEL__MOUNT_TYPE, new EnumDimension(DimensionKey.FRONT_WHEEL__MOUNT_TYPE, ComponentType.FRONT_WHEEL, "Tire Type", "", DimensionUnits.NONE, Object.keys(TireType), Object.values(TireType))],
        [DimensionKey.FRONT_WHEEL__WHEEL_SIZE, new EnumDimension(DimensionKey.FRONT_WHEEL__WHEEL_SIZE, ComponentType.FRONT_WHEEL, "Size", "", DimensionUnits.NONE, Object.keys(MTBWheelSize), Object.values(MTBWheelSize))],
        [DimensionKey.FRONT_WHEEL__INTERNAL_WIDTH, new NumberDimension(DimensionKey.FRONT_WHEEL__INTERNAL_WIDTH, ComponentType.FRONT_WHEEL, "Internal Width", "", DimensionUnits.MILIMETER)],
        [DimensionKey.FRONT_WHEEL__SPOKE_COUNT, new NumberDimension(DimensionKey.FRONT_WHEEL__SPOKE_COUNT, ComponentType.FRONT_WHEEL, "Spoke Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.FRONT_WHEEL__MATERIAL, new StringDimension(DimensionKey.FRONT_WHEEL__MATERIAL, ComponentType.FRONT_WHEEL, "Material", "", DimensionUnits.NONE)],
        [DimensionKey.FRONT_WHEEL__HUB, new StringDimension(DimensionKey.FRONT_WHEEL__HUB, ComponentType.FRONT_WHEEL, "Hub", "", DimensionUnits.NONE)],
        [DimensionKey.FRONT_WHEEL__BRAKE_CLAMP_TYPE, new EnumDimension(DimensionKey.FRONT_WHEEL__BRAKE_CLAMP_TYPE, ComponentType.FRONT_WHEEL, "Brake Clamp Type", "", DimensionUnits.NONE, Object.keys(BrakeClampType), Object.values(BrakeClampType))],
        [DimensionKey.FRONT_WHEEL__AXLE, new EnumDimension(DimensionKey.FRONT_WHEEL__AXLE, ComponentType.FRONT_WHEEL, "Axle", "", DimensionUnits.NONE, Object.keys(FrontAxle), Object.values(FrontAxle))],
        ]);
    }

    public static rearWheelDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.REAR_WHEEL__MOUNT_TYPE, new EnumDimension(DimensionKey.REAR_WHEEL__MOUNT_TYPE, ComponentType.REAR_WHEEL, "Tire Type", "", DimensionUnits.NONE, Object.keys(TireType), Object.values(TireType))],
        [DimensionKey.REAR_WHEEL__WHEEL_SIZE, new EnumDimension(DimensionKey.REAR_WHEEL__WHEEL_SIZE, ComponentType.REAR_WHEEL, "Size", "", DimensionUnits.NONE, Object.keys(MTBWheelSize), Object.values(MTBWheelSize))],
        [DimensionKey.REAR_WHEEL__INTERNAL_WIDTH, new NumberDimension(DimensionKey.REAR_WHEEL__INTERNAL_WIDTH, ComponentType.REAR_WHEEL, "Internal Width", "", DimensionUnits.MILIMETER)],
        [DimensionKey.REAR_WHEEL__SPOKE_COUNT, new NumberDimension(DimensionKey.REAR_WHEEL__SPOKE_COUNT, ComponentType.REAR_WHEEL, "Spoke Count", "", DimensionUnits.NUMBER)],
        [DimensionKey.REAR_WHEEL__MATERIAL, new StringDimension(DimensionKey.REAR_WHEEL__MATERIAL, ComponentType.REAR_WHEEL, "Material", "", DimensionUnits.NONE)],
        [DimensionKey.REAR_WHEEL__HUB, new StringDimension(DimensionKey.REAR_WHEEL__HUB, ComponentType.REAR_WHEEL, "Hub", "", DimensionUnits.NONE)],
        [DimensionKey.REAR_WHEEL__BRAKE_CLAMP_TYPE, new EnumDimension(DimensionKey.REAR_WHEEL__BRAKE_CLAMP_TYPE, ComponentType.REAR_WHEEL, "Brake Clamp Type", "", DimensionUnits.NONE, Object.keys(BrakeClampType), Object.values(BrakeClampType))],
        [DimensionKey.REAR_WHEEL__AXLE, new EnumDimension(DimensionKey.REAR_WHEEL__AXLE, ComponentType.REAR_WHEEL, "Axle", "", DimensionUnits.NONE, Object.keys(RearAxle), Object.values(RearAxle))],
        ]);
    }

    public static frontBrakeMountAdapterDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([]);
    }

    public static rearBrakeMountAdapterDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([]);
    }

    public static valvesDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.VALVES__LENGTH, new NumberDimension(DimensionKey.VALVES__LENGTH, ComponentType.VALVES, "Length", "", DimensionUnits.MILIMETER)],
        ]);
    }

    public static sealantDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        // [DimensionKey.SEALANT__COLOR, new StringDimension(DimensionKey.SEALANT__COLOR, ComponentType.SEALANT, "Color", "", DimensionUnits.NONE)],
        ]);
    }

    public static tubesDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.TUBES__FRONT_WHEEL_SIZE, new EnumDimension(DimensionKey.TUBES__FRONT_WHEEL_SIZE, ComponentType.TUBES, "Front Wheel Size", "", DimensionUnits.NONE, Object.keys(MTBWheelSize), Object.values(MTBWheelSize))],
        [DimensionKey.TUBES__REAR_WHEEL_SIZE, new EnumDimension(DimensionKey.TUBES__REAR_WHEEL_SIZE, ComponentType.TUBES, "Rear Wheel Size", "", DimensionUnits.NONE, Object.keys(MTBWheelSize), Object.values(MTBWheelSize))],
        ]);
    }

    public static cableEndsDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        // [DimensionKey.CABLE_ENDS__SIZE, new NumberDimension(DimensionKey.CABLE_ENDS__SIZE, ComponentType.SHOCK, "Size", "", DimensionUnits.MILIMETER)],
        [DimensionKey.CABLE_ENDS__QUANTITY, new NumberDimension(DimensionKey.CABLE_ENDS__QUANTITY, ComponentType.CABLE_ENDS, "Quantity Needed", "", DimensionUnits.NUMBER)],
        ]);
    }

    public static FerruleDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
        [DimensionKey.FERRULE__SIZE, new EnumDimension(DimensionKey.FERRULE__SIZE, ComponentType.CABLE_FERRULE, "Size", "", DimensionUnits.NONE, Object.keys(FerruleType), Object.values(FerruleType))],
        ]);
    }

    public static barsDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
            [DimensionKey.BARS__CLAMP_DIAMETER, new NumberDimension(DimensionKey.BARS__CLAMP_DIAMETER, ComponentType.BARS, "Clamp Diameter", "", DimensionUnits.MILIMETER)],
            [DimensionKey.BARS__LENGTH, new NumberDimension(DimensionKey.BARS__LENGTH, ComponentType.BARS, "Length", "", DimensionUnits.MILIMETER)],
            [DimensionKey.BARS__RISE, new NumberDimension(DimensionKey.BARS__RISE, ComponentType.BARS, "Rise", "", DimensionUnits.MILIMETER)],
            [DimensionKey.BARS__MATERIAL, new StringDimension(DimensionKey.BARS__MATERIAL, ComponentType.BARS, "Material", "", DimensionUnits.NONE)],
        ]);
    }

    public static stemDimensions(): Map<DimensionKey, Dimension> { 
        return new Map<DimensionKey, Dimension>([
            [DimensionKey.STEM__CLAMP_DIAMETER, new NumberDimension(DimensionKey.STEM__CLAMP_DIAMETER, ComponentType.STEM, "Clamp Diameter", "", DimensionUnits.MILIMETER)],
            [DimensionKey.STEM__STEERER_DIAMETER, new NumberDimension(DimensionKey.STEM__STEERER_DIAMETER, ComponentType.STEM, "Steerer Diameter", "", DimensionUnits.MILIMETER)],
            [DimensionKey.STEM__MATERIAL, new StringDimension(DimensionKey.STEM__MATERIAL, ComponentType.STEM, "Material", "", DimensionUnits.NONE)],
        ]);
    }

    public static gripsDimensions(): Map<DimensionKey, Dimension> {
        return new Map<DimensionKey, Dimension>([
            [DimensionKey.GRIPS__MATERIAL, new StringDimension(DimensionKey.GRIPS__MATERIAL, ComponentType.GRIPS, "Material", "", DimensionUnits.NONE)],
        ]);
    }
}