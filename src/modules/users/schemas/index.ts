import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @IsNotEmpty()
  @Prop()
  @ApiProperty({ required: true })
  _id: string;

  @Prop()
  @ApiProperty()
  lastLoginList: Date[];

  @Prop()
  @ApiProperty()
  photo: string | null;

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    required: true,
    minimum: 1,
    maximum: 3,
  })
  connections: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
