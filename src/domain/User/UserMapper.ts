import User from './User';
import UserDTO from './UserDto';

export default class UserMapper {
  static toDto(user: User): UserDTO {
    const { email } = user;
    return {
      data: {
        email,
      }
    }
  }
}