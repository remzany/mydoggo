import { Document } from 'mongoose';

export interface Breed extends Document {
    readonly "id":string,
    readonly "name":string,
    readonly "size":number,
    readonly "kidFriendly":number,
    readonly "dogFriendly":number,
    readonly "lowShedding":number,
    readonly "easyToGroom":number,
    readonly "highEnergy":number,
    readonly "goodHealth":number,
    readonly "lowBarking":number,
    readonly "intelligence":number,
    readonly "easyToTrain":number,
    readonly "toleratesHot":number,
    readonly "toleratesCold":number
}
