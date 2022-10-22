"use strict";

const app = require("../app");
const port = 5500;


app.listen(port, () => {
    console.log(`서버를 실행합니다. http://localhost:${port}`);
});