import { NextFunction, Request, Response } from "express";
import { controller, httpPost, next, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from "../../constant/types";
import UserResolver, { ExistingEmailError } from "./UserResolver";
import UserDTO from "./UserDto";
import HttpErrors from "http-errors";
import { Authenticator, InvalidCredentialsError, UserNotFoundError } from "../../services/Authenticator";
import { authenticate } from "../../middlewares/Authenticator";

@controller("/api/users")
export default class UserController {
  constructor(
    @inject(TYPES.UserResolver) private userResolver: UserResolver,
    @inject(TYPES.Authenticator) private authenticator: Authenticator
  ) {}

  @httpPost("/sign-in", authenticate)
  // @httpPost("/sign-in")
  // public signIn(@request() req: Request, @response() res: Response, next: NextFunction): void {
  //   const passport = this.authenticator.getNativeAuthenticator();
  //   passport.authenticate('local', (err, user) => {
  //     if (err) {
  //       if (err instanceof UserNotFoundError || err instanceof InvalidCredentialsError) {
  //         return next(new HttpErrors.BadRequest());
  //       }
  //       return next(err);
  //     }
  //     console.log('Inside passport.authenticate() callback');
  //     console.log(`req.session.passport: ${JSON.stringify((req.session as any).passport)}`)
  //     console.log(`req.user: ${JSON.stringify(req.user)}`)
  //     req.login(user, (err) => {
  //       console.log('Inside req.login() callback')
  //       console.log(`req.session.passport: ${JSON.stringify((req.session as any).passport)}`)
  //       console.log(`req.user: ${JSON.stringify(req.user)}`)
  //       return res.send('You were authenticated & logged in!\n');
  //     })
  //   })(req, res, next);
  // }
  
  @httpPost("/sign-up")
  public async signUp(@request() req: Request, @response() res: Response): Promise<void> {
    const { email, password } = req.body as any;
    try {
      const dto: UserDTO = await this.userResolver.signUp({ email, password });
      res.status(201);
      res.send(dto);
    } catch (err) {
      if (err instanceof ExistingEmailError) {
        throw new HttpErrors.BadRequest();
      }
      next();
    }
  }

  // @httpPost("/sign-out")
  // public async signOut(@request() req: Request, @response() res: Response): Promise<void> {
  //   const { email, password } = req.cookies;
  //   const dto: UserDTO = await this.userResolver.signOut({ email, password });
  //   res.status(204);
  //   res.send(dto);
  // }
}
