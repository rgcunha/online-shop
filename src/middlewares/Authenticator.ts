import express from "express";
import HttpErrors from "http-errors";
import { Authenticator, InvalidCredentialsError, UserNotFoundError } from "../services/Authenticator";
import { Handler } from "express";
import { container } from "../Container";
import TYPES from "../constant/types";

export function createAuthenticationMiddleware(): Handler {
  const authenticator: Authenticator = container.get(TYPES.Authenticator);
  const nativeAuthenticator = authenticator.getNativeAuthenticator();
  return nativeAuthenticator.initialize();
}

export function createAuthenticationSessionMiddleware(): Handler {
  const authenticator: Authenticator = container.get(TYPES.Authenticator);
  const nativeAuthenticator = authenticator.getNativeAuthenticator();  
  return nativeAuthenticator.session();
}

export function authenticate(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const authenticator: Authenticator = container.get(TYPES.Authenticator);
  const passport = authenticator.getNativeAuthenticator();
  passport.authenticate('local', (err, user) => {
    if (err) {
      if (err instanceof UserNotFoundError || err instanceof InvalidCredentialsError) {
        return res.redirect("/api/health");
        //req.session.destroy(() => console.log("session destroyed"));
        return next(new HttpErrors.BadRequest());
      }
      return next(err);
    }
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport: ${JSON.stringify((req.session as any).passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      console.log(`req.session.passport: ${JSON.stringify((req.session as any).passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      return res.send('You were authenticated & logged in!\n');
    })
  })(req, res, next);
}

export function authorizationMiddleware(): Handler {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.isAuthenticated()) { next(); }
    throw new HttpErrors.Unauthorized();
  }
}