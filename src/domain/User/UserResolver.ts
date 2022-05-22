import { injectable } from 'inversify';
import User, { IUser } from './User';
import UserDTO from './UserDto';
import UserMapper from './UserMapper';

export interface UserSignUpDto {
  email: string,
  password: string,
}

export class ExistingEmailError extends Error {};

export interface IUserResolver {
  signUp({ email, password }: UserSignUpDto): Promise<UserDTO>;
}

@injectable()
export default class UserResolver implements IUserResolver {
  public async signUp({ email, password }: UserSignUpDto): Promise<UserDTO> {
    const isExistingEmail = await User.exists({ email });
    if (isExistingEmail) {
      throw new ExistingEmailError(`Email: ${email} already exists`);
    }
    const user: IUser = await User.create({ email, password });
    return UserMapper.toDto(user);
  }
}
