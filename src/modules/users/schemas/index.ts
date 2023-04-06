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
}

export const UserSchema = SchemaFactory.createForClass(User);
