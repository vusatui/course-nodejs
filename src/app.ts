import 'reflect-metadata';
import { bootstrapMicroframework } from "microframework";

import { expressLoader } from "./loaders/expressLoader";
import { typeOrmLoader } from "./loaders/typeOrmLoader";
import {loggerLoader} from "./loaders/loggerLoader";

bootstrapMicroframework([
    loggerLoader,
    typeOrmLoader,
    expressLoader,
])
    .then(() => console.log("Application is up and running."))
    .catch((error) => console.log("Application is crashed: " + error));
