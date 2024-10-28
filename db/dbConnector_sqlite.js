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

module.exports = {
    getPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer
};