

function config(app){
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const cors = require("cors");
app.use(cors({origin: process.env.ORIGIN}));
}

module.exports = config;