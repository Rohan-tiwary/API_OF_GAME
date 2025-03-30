const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController.js");

router.get("/leaderboard", playerController.getLeaderboard);
router.get("/player/:id", playerController.getPlayerById);
router.get("/top-players", playerController.getTopPlayers);
router.get("/top-killers", playerController.getTopKillers);
router.get("/highest-headshots", playerController.getHighestHeadshots);
router.get("/best-accuracy", playerController.getBestAccuracy);
router.get("/longest-survival", playerController.getLongestSurvival);
router.post("/add-player", playerController.addPlayer);
router.put("/update-player/:id", playerController.updatePlayerStats);
router.delete("/delete-player/:id", playerController.deletePlayer);

module.exports = router;
