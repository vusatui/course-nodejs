import 'reflect-metadata';
import { bootstrapMicroframework } from "microframework";

import { expressLoader } from "./loaders/expressLoader";
import { typeOrmLoader } from "./loaders/typeOrmLoader";

bootstrapMicroframework([
    typeOrmLoader,
    expressLoader,
])
    .then(() => console.log("Application is up and running."))
    .catch((error) => console.log("Application is crashed: " + error));
