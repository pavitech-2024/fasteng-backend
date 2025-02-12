import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @IsNotEmpty()
  @Prop()
  _id: string;

  @Prop()
  lastLoginList: Date[];

  @Prop()
  photo: string | null;

  @IsNotEmpty()
  @Prop()
  connections: number;

  @Prop({ type: Object })
  preferences: {
    language: string;
    decimal: number;
  };

  @IsNotEmpty()
  @Prop()
  name: string;

  @IsNotEmpty()
  @Prop()
  email: string;

  @IsNotEmpty()
  @Prop()
  phone: string;

  @IsNotEmpty()
  @Prop()
  dob: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
