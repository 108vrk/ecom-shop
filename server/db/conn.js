const mongoose = require("mongoose");

const URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.9rgnhvp.mongodb.net/test`;
/* Convert the special characters (: / ? # [ ] @) in your password or username to percentange characters i.e

@ = %40
' = %27
! = %21
...
e.g. p@ssw0rd'9'! becomes p%40ssw0rd%279%27%21 */
const connection = async () => {
  try {
    const connectionParameters = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose
      .connect(URL, connectionParameters)
      .then((res) => console.log("Connection successful"));
  } catch (error) {
    console.log("Connection UnSuccessful.");
    console.log(error);
  }
};

module.exports = connection;
