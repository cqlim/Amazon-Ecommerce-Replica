const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const morgan = require("morgan");


const api = require("./api/index");

app.use(express.json());
app.use(express.static("public"));


/*
 * All routes for the API are written in modules in the api/ directory.  The
 * top-level router lives in api/index.js.  That's what we include here, and
 * it provides all of the routes.
 */
app.use(morgan("dev"));

app.use("/", api);



app.use("*", (err, req, res, next) => {
	res.status(500).send({ err: "An error occured. Try again later. " });
})

app.use("*", function (req, res, next) {
	res.status(404).json({
		error: "Requested resource " + req.originalUrl + " does not exist",
	});
});

app.listen(port, () => {
	console.log("== Server is running on port", port);
});
