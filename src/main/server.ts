import { MongoHelper } from "../infra/helpers/mongo.helper";
import { app } from "./config/app";
import env from "./config/env";

MongoHelper.connect(env.MONGO_URI)
  .then(async () => {
    app.listen(env.PORT_SERVER, () =>
      console.log(`Server running at http://localhost:${env.PORT_SERVER}`)
    );
  })
  .catch(console.error);
