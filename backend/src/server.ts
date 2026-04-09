import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import weightRoutes from "./routes/weight.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import exercisesRoutes from "./routes/exercises.routes.js";

app.use("/exercise", exercisesRoutes);
app.use("/weight", weightRoutes);
app.use("/categories", categoriesRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
