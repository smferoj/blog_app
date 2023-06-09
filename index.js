const app = require("./app.js");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });

// ===============SERVER LISTEN===========

app.listen(process.env.PORT, () => {
	console.log(`Server is Running at PORT ${process.env.PORT}`);
});