const mongoose = require("mongoose");

const TenderSchema = new mongoose.Schema(
    {
        name: String,
        startingBid: Number,
        description: String,
        startTime: String,
        endTime: String,
        bufferTime: String,
        bids: [
            {
                companyName: String,
                bidCost: Number,
                bidTime: String,
            }
        ]
  },
    { collection: "tenders", timestamps: true }
);

module.exports =
    mongoose.models.products || mongoose.model("tenders", TenderSchema);
