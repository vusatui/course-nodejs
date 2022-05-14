import 'reflect-metadata';
import { bootstrapMicroframework } from "microframework";

import { expressLoader } from "./loaders/expressLoader";
import { typeOrmLoader } from "./loaders/typeOrmLoader";
import { loggerLoader } from "./loaders/loggerLoader";
import { Container } from "typedi";
import { Logger } from "winston";

bootstrapMicroframework([
    loggerLoader,
    typeOrmLoader,
    expressLoader,
])
    .then(() => console.log("Application is up and running."))
    .catch((error) => console.log("Application is crashed: " + error));

const handleUncaughtError = (error: Error) => {
    const logger: Logger = Container.get("logger");
    logger.error(error.stack);
};

process.on('uncaughtException', handleUncaughtError);
process.on('unhandledRejection', handleUncaughtError);
