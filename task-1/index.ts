import express from "express";

import { userApi } from "./api"
import { User } from "./types";

const PORT = 3000;

const app = express();
app.use(express.json());


const usersStorage: Array<User> = [];
const userApiRouter = express.Router();
userApi(userApiRouter, usersStorage);

const apiV1 = express.Router();
apiV1.use("/user", userApiRouter);
apiV1.get("/getAutoSuggestUsers", (req, res) => {
    const {
        loginSubstring,
        limit,
    } = req.body as { loginSubstring?: string; limit?: number; };

    res.json(
        usersStorage
            .filter(
                (user) => user.login.includes(loginSubstring || "")
            )
            .sort(
                (a, b) => a.login > b.login ? 1 : -1
            )
            .slice(0, limit)
    );
});


app.use("/api/v1", apiV1);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
