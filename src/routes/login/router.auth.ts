import passport from "passport";
import strategy from "passport-google-oauth20";
import { ConfigService } from "../../utilities/service.config";

const config = ConfigService.getInstance().getConfig();
const GoogleStrategy = strategy.Strategy;

passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true,
      },

      (request :any, accessToken:any, refreshToken:any, profile:any, done:any) => {
          if (profile._json.email === "rajib.hasan@braincraftapps.com") {
            return done(null, profile);
          } else {
            return done(null);
          }
        }
      )
    );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });