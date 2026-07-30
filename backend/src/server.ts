import express from "express";
import categoriesRoutes from "./routes/categories.routes.js";
import exercisesRoutes from "./routes/exercises.routes.js";
import routinesRoutes from "./routes/routine.routes.js";
import weightRoutes from "./routes/weight.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/exercise", exercisesRoutes);
app.use("/weight", weightRoutes);
app.use("/categories", categoriesRoutes);
app.use("/routine", routinesRoutes);

const PORT = 3000;

async function bootstrap() {
  await runMigrations();

  app.listen(3333, () => {
    console.log("server running");
  });
}

bootstrap();
