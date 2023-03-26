import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controller';
import { AuthService } from './service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
