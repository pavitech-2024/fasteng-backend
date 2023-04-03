import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas';

export interface IUsersService {
  createUser({ uuid, connections, lastLoginList, photo }: CreateUserDto): Promise<User>;

  getUser(id: string): Promise<User>;

  updateUser(user: User): Promise<User>;

  deleteUser(id: string): Promise<User>;
}
