import { MicroframeworkSettings } from "microframework";
import {
    createConnection,
} from "typeorm";

export const typeOrmLoader = async (settings: MicroframeworkSettings) => {
    const connection = await createConnection();

    settings.onShutdown(() => connection.close());
};
