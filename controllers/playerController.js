const db = require("../config/db");

exports.getLeaderboard = (req, res) => {
    const sql = "SELECT playerName, playerRank, totalKills, winRate FROM PlayerStats ORDER BY playerRank ASC";
    console.time("getLeaderboard");
    db.query(sql, (err, results) => {
        console.timeEnd("getLeaderboard");
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};



exports.getPlayerById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT playerName, totalKills, playerRank, winRate, headshots, accuracy, totalMatches, longestSurvival FROM PlayerStats WHERE id = ?";
    console.time("getPlayerById");
    db.query(sql, [id], (err, results) => {
        console.timeEnd("getPlayerById");
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0] || {});
    });
};


exports.getTopPlayers = (req, res) => {
    const sql = "SELECT playerName, playerRank FROM PlayerStats ORDER BY playerRank ASC LIMIT 10";
    console.time("getTopPlayers");
    db.query(sql, (err, results) => {
        console.timeEnd("getTopPlayers");
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


exports.getTopKillers = (req, res) => {
    const sql = "SELECT playerName, totalKills FROM PlayerStats ORDER BY totalKills DESC LIMIT 10";
    console.time("getTopKillers");
    db.query(sql, (err, results) => {
        console.timeEnd("getTopKillers");
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


exports.getHighestHeadshots = (req, res) => {
    const sql = "SELECT playerName, headshots FROM PlayerStats ORDER BY headshots DESC LIMIT 10";
    console.time("getHighestHeadshots");
    db.query(sql, (err, results) => {
        console.timeEnd("getHighestHeadshots");
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


exports.getBestAccuracy = (req, res) => {
    const sql = "SELECT playerName, accuracy FROM PlayerStats ORDER BY accuracy DESC LIMIT 10";
    console.time("getBestAccuracy");
    db.query(sql, (err, results) => {
        console.timeEnd("getBestAccuracy");
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


exports.getLongestSurvival = (req, res) => {
    const sql = "SELECT playerName, longestSurvival FROM PlayerStats ORDER BY longestSurvival DESC LIMIT 10";
    console.time("getLongestSurvival");
    db.query(sql, (err, results) => {
        console.timeEnd("getLongestSurvival");
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


exports.addPlayer = (req, res) => {
    const { playerName, totalKills, playerRank, winRate, headshots, accuracy, totalMatches, longestSurvival } = req.body;
    const sql = "INSERT INTO PlayerStats (playerName, totalKills, playerRank, winRate, headshots, accuracy, totalMatches, longestSurvival) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [playerName, totalKills, playerRank, winRate, headshots, accuracy, totalMatches, longestSurvival], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Player added successfully", playerId: result.insertId });
    });
};

exports.updatePlayerStats = (req, res) => {
    const { id } = req.params;
    const { totalKills, playerRank, winRate, headshots, accuracy, totalMatches, longestSurvival } = req.body;

    const updates = [];
    const values = [];
    console.time("updatePlayerStats");

    if (totalKills !== undefined) { updates.push("totalKills = ?"); values.push(totalKills); }
    if (playerRank !== undefined) { updates.push("playerRank = ?"); values.push(playerRank); }
    if (winRate !== undefined) { updates.push("winRate = ?"); values.push(winRate); }
    if (headshots !== undefined) { updates.push("headshots = ?"); values.push(headshots); }
    if (accuracy !== undefined) { updates.push("accuracy = ?"); values.push(accuracy); }
    if (totalMatches !== undefined) { updates.push("totalMatches = ?"); values.push(totalMatches); }
    if (longestSurvival !== undefined) { updates.push("longestSurvival = ?"); values.push(longestSurvival); }

    if (updates.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id);
    const sql = `UPDATE PlayerStats SET ${updates.join(", ")} WHERE id = ?`;

    db.query(sql, values, (err, result) => {
        console.timeEnd("updatePlayerStats");
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Player stats updated successfully", affectedRows: result.affectedRows });
    });
};

exports.deletePlayer = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM PlayerStats WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Player deleted successfully" });
    });
};
