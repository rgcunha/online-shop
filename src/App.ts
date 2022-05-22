import dotenv from "dotenv";

dotenv.config();

import cors from "cors";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
// import { Strategy as LocalStrategy } from "passport-local";
// import passport from "passport";
import basicAuth from "express-basic-auth";
import helmet from "helmet";
import HttpErrors from "http-errors";
import { loggingMiddleware } from "./middlewares/Logger";
import { createAuthenticationMiddleware, createAuthenticationSessionMiddleware } from "./middlewares/Authenticator";
import { container } from "./Container";
import TYPES from "./constant/types";
import { Authenticator, InvalidCredentialsError, UserNotFoundError } from "./services/Authenticator";

const app: express.Application = express();
const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};
const mongoOptions = {
  mongoUrl: process.env.MONGO_DB_CONNECTION_URL,
};

// const users = [
//   {id: '2f24vvg', email: 'test@test.com', password: 'password'}
// ]

// configure passport.js to use the local strategy
// passport.use(new LocalStrategy(
//   { usernameField: 'email' },
//   (email, password, done) => {
//     console.log('Inside local strategy callback')
//     // here is where you make a call to the database
//     // to find the user based on their username or email address
//     // for now, we'll just pretend we found that it was users[0]
//     // DB.findById()
//     const user = users[0] 
//     if(email === user.email && password === user.password) {
//       console.log('Local strategy returned true')
//       return done(null, user)
//     }
//   }
// ));

// tell passport how to serialize the user
// passport.serializeUser((user, done) => {
//   console.log('Inside serializeUser callback. User id is save to the session file store here')
//   done(null, (user as any).id);
// });

// passport.deserializeUser((id, done) => {
//   console.log('Inside deserializeUser callback')
//   console.log(`The user id passport saved in the session mongo store is: ${id}`)
//   const user = users[0].id === id ? users[0] : false; 
//   done(null, user);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(loggingMiddleware());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create(mongoOptions),
  //cookie: { secure: true }
}))
//app.use(passport.initialize());
//app.use(passport.session());
app.use(createAuthenticationMiddleware());
app.use(createAuthenticationSessionMiddleware());

app.get("/api/health", (req: express.Request, res: express.Response) => {
  res.sendStatus(200);
});

// create the login get and post routes
// app.get('/api/login', (req, res) => {
//   console.log('Inside GET /login callback')
//   console.log(req.sessionID)
//   res.send(`You got the login page!\n`)
// })

// app.post('/api/users/sign-in', (req, res, next) => {
//   const authenticator: Authenticator = container.get(TYPES.Authenticator);
//   const passport = authenticator.getNativeAuthenticator();

//   console.log('Inside POST /login callback')
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
// })

// app.get('/authrequired', (req, res) => {
//   if(req.isAuthenticated()) {
//     res.send('you hit the authentication endpoint\n')
//   } else {
//     res.status(401).send("Must authenticate first");
//   }
// })

//app.use(basicAuth({ users: { admin: process.env.BASIC_AUTH_PASSWORD as string } }));

export { app };
