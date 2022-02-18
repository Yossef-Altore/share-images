const mongoose = require("mongoose");
const config = require("config");
const dbConfig = config.get("Customer.dbConfig.dbName");
mongoose
  .connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });

/* mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then(() => console.log("connected")); */
