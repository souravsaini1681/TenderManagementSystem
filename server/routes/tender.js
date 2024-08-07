const tenders = require("../models/tendersModel");
const router = require("express").Router();
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const data = await tenders.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await tenders.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await tenders.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await tenders.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted success");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/buffer/:id", async (req, res) => {
  try {
    console.log("Buffer time update endpoint hit");

    const id = req.params.id;
    const bodyData = req.body; // Access endDate from req.body

    console.log("Received endDate:", bodyData);

    // Update the end time with buffer
    const result = await tenders.updateOne(
      { _id: id },
      { $set: { endTime: bodyData.endTime } }
    );

    if (result.nModified === 0) {
      console.log("Tender not found or update not performed");
      return res
        .status(404)
        .json({ message: "Tender not found or update not done" });
    }

    res.status(200).json({ message: "Update success" });
  } catch (err) {
    console.error("Error updating buffer time:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

router.post("/update/:id", async (req, res) => {
  const tenderId = req.params.id;
  const newBid = req.body;

  try {
    const id = tenderId;

    const result = await tenders.updateOne(
      { _id: id },
      { $push: { bids: newBid } }
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "Tender not found or bid not added" });
    }

    console.log("updatd dt aherer", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating tender:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
