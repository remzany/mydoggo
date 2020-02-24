import { prop } from "@typegoose/typegoose";

export class Breed {
  @prop({ required: true })
  name: string;
  size: number;
  kidFriendly: number;
  dogFriendly: number;
  lowShedding: number;
  easyToGroom: number;
  highEnergy: number;
  goodHealth: number;
  lowBarking: number;
  intelligence: number;
  easyToTrain: number;
  toleratesHot: number;
  toleratesCold: number;
}