import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utilis/constants.mjs";

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`Inside Deserializer`);
  console.log(`Deserializing  User ID:  ${id}`);
  try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(username);
    console.log(password);
    try {
      const findUser = mockUsers.find((user) => user.userName === username);
      if (!findUser) throw Error("User not found");
      if (findUser.password !== password) throw Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
