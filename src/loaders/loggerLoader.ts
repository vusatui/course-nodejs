import  *  as  winston  from  'winston';
import  DailyRotateFile from 'winston-daily-rotate-file';
import { Container } from "typedi";
import { transports } from "winston";

export const loggerLoader = () => {
    const transport: DailyRotateFile = new DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    });

    const logger = winston.createLogger({
        transports: [
            transport,
            new transports.Console()
        ]});

    Container.set("logger", logger);
};

