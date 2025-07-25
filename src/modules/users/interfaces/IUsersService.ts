import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schemas';

export interface IUsersService {
  createUser({ uuid, connections, lastLoginList, photo }: CreateUserDto): Promise<User>;

  getUser(id: string): Promise<User>;

  updateUser(id: string, user: User): Promise<User>;

  updateUser(id: string, user: UpdateUserDto): Promise<User>; 

  deleteUser(id: string): Promise<User>;
}
