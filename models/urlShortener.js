import mongoose from "mongoose";

const urlShortenerSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortenUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.model("urlShortener", urlShortenerSchema);
