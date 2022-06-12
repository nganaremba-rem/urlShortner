import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import shortenerModel from "./models/urlShortener.js";
import shortid from "shortid";
//  learning to use ESmodule instead of common JS module
//  for exporting dont forget to use export default or export individually if you use type module in package.json

const app = express();
dotenv.config();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//  connecting to the remote mongodb atlas
mongoose.connect(process.env.MONGODB_URI, () =>
  console.log("MongoDB Connected"),
);

//  to render the index page, you can use router also
app.get("/", async (req, res) => {
  const list = await shortenerModel.find();
  res.render("index", { list });
});

//  to shorten the url and if it specifies the custom it will assigned the custom url
app.post("/shorten", async (req, res) => {
  const { url, customUrl } = req.body;
  let custom = customUrl.trim();
  const data = await shortenerModel.create({
    fullUrl: url,
    shortenUrl: custom || shortid.generate(),
  });
  console.log(data);
  res.redirect("/");
});

//  to delete all the entries from the database
app.get("/deleteMany", async (req, res) => {
  await shortenerModel.deleteMany({});
  res.redirect("/");
});

//  to get all the link and convert it into the original url
app.get("/:link", async (req, res) => {
  const link = req.params.link;
  const data = await shortenerModel.findOne({ shortenUrl: link });
  res.redirect(data.fullUrl);
});

// dotenv is used only for the production environment else use 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listening on Port " + PORT));
