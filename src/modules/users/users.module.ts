import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/';
import { UsersController } from './controller';
import { UsersRepository } from './repository';
import { UsersService } from './service';
import { DATABASE_CONNECTION } from '../../infra/mongoose/database.config';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], DATABASE_CONNECTION.COMMON)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
