import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/';
import { UsersController } from './controller';
import { UsersRepository } from './repository';
import { UsersService } from './service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'common')],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
