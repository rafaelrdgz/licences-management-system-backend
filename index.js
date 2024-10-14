import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./src/routes/routes.js";

import entities from "./src/routes/entitiesRoutes.js";
import clients from "./src/routes/clientsRoutes.js";
import drivers from "./src/routes/driversRoutes.js";
import licenses from "./src/routes/licensesRoutes.js";
import exams from "./src/routes/examsRoutes.js";
import infractions from "./src/routes/infractionsRoutes.js";
import center from "./src/routes/centerRoutes.js";
import logo from "./src/routes/logoRoutes.js";
import reports from "./src/routes/reportsRoutes.js";
import workers from "./src/routes/workersRoutes.js";
import dashboard from "./src/routes/dashboardRoutes.js";
import auth from "./src/routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(auth);
app.use(routes);
app.use(entities);
app.use(clients);
app.use(drivers);
app.use(licenses);
app.use(exams);
app.use(infractions);
app.use(center);
app.use(logo);
app.use(reports);
app.use(workers);
app.use(dashboard);

app.listen(3000);
console.log("Server on port 3000");
