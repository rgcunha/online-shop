import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { injectable } from "inversify";
import User, { IUser } from "../domain/User/User";

export class UserNotFoundError extends Error {};
export class InvalidCredentialsError extends Error {};

@injectable()
export class Authenticator {
  private authenticator: passport.Authenticator;

  constructor() {
    this.authenticator = new passport.Authenticator();
    this.authenticator.serializeUser(Authenticator.serializeUser);
    this.authenticator.deserializeUser(Authenticator.deserializeUser);
    this.authenticator.use(Authenticator.createLocalStrategy());
  }

  private static serializeUser(user: any, done: any) {
    done(null, (user as any).id);
  }

  private static async deserializeUser(userId: string, done: any) {
    const user: IUser | null  = await User.findById(userId);
    done(null, user);
  }

  private static async authenticateWithEmail(email: string, password: string): Promise<IUser> {
    const user: IUser | null = await User.findOne({ email });
    console.log("authenticate with email");
    if (!user) throw new UserNotFoundError();
    if (password !== user.password) throw new InvalidCredentialsError();
    return user;
  }

  private static createLocalStrategy() {
    const options = { usernameField: 'email' };
    const verifyFn = async (email: string, password: string, done: any) => {
      try {
        const user = await Authenticator.authenticateWithEmail(email, password);
        console.log("authenticate with email success");
        return done(null, user);
      } catch(err) {
        console.log("authenticate with email errored");
        console.log(err); //asdasd
        return done(err, null);
      }
    };
    const strategy = new LocalStrategy(options, verifyFn);
    return strategy;  
  }

  public getNativeAuthenticator(): passport.Authenticator {
    return this.authenticator;
  }
}