const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function connect() {
    return open({
        filename: './db/FootLab.sqlite3',
        driver: sqlite3.Database
    });
}

async function getPlayers() {
    const db = await connect();
    const players = await db.all('SELECT * from Player');
    return players;
}

async function addPlayer(player) {
    const db = await connect();
    const { first_name, last_name, surname, description, date_of_birth } = player;
    const sql = 'INSERT INTO Player (first_name, last_name, surname, description, date_of_birth) VALUES (?, ?, ?, ?, ?)';
    await db.run(sql, [first_name, last_name, surname, description, date_of_birth]);
}

async function updatePlayer(player_id, player) {
    const db = await connect();
    const { first_name, last_name, surname, description, date_of_birth } = player;
    const sql = 'UPDATE Player SET first_name = ?, last_name = ?, surname = ?, description = ?, date_of_birth = ? WHERE player_id = ?';
    await db.run(sql, [first_name, last_name, surname, description, date_of_birth, player_id]);
}

async function deletePlayer(player_id) {
    const db = await connect();
    const sql = 'DELETE FROM Player WHERE player_id = ?';
    await db.run(sql, [player_id]);
}

async function getRepresents() {
    const db = await connect();
    const represents = await db.all(`
        SELECT 
            Represents.player_id, 
            Represents.team_id, 
            Player.first_name, 
            Player.last_name, 
            Team.name AS team_name 
        FROM Represents
        JOIN Player ON Represents.player_id = Player.player_id
        JOIN Team ON Represents.team_id = Team.team_id
    `);
    return represents;
}

async function getTeams() {
    const db = await connect();
    const teams = await db.all('SELECT * from Team');
    return teams;
}

async function addRepresentation(representation) {
    const db = await connect();
    const { player_id, team_id } = representation;
    const sql = 'INSERT INTO Represents (player_id, team_id) VALUES (?, ?)';
    await db.run(sql, [player_id, team_id]);
}

module.exports = {
    getPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer,
    getRepresents,
    getTeams,
    addRepresentation
};