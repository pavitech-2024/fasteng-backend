import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

export type ABCPDocument = HydratedDocument<ABCP>;

export type ABCPGeneralData = {
    userId: string;
    name: string;
}

@Schema({ collection: 'abcps' })
export class ABCP {
    _id: string;

    @IsNotEmpty()
    @Prop({ type: Object })
    generalData: ABCPGeneralData;

}

export const ABCPSchema = SchemaFactory.createForClass(ABCP);