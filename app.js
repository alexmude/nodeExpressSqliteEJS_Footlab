const express = require('express');
const bodyParser = require('body-parser');
const dbConnector = require('./db/dbConnector_sqlite');
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // To parse JSON bodies

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Render the index page with players
app.get('/', async (req, res) => {
    const players = await dbConnector.getPlayers();
    res.render('index', { title: 'Player Management', getplayers: players });
});

// Add Player Route
app.post('/addplayer', async (req, res) => {
    const { first_name, last_name, surname, description, date_of_birth } = req.body;
    await dbConnector.addPlayer({ first_name, last_name, surname, description, date_of_birth });
    res.redirect('/');
});

// Update Player Route
app.post('/updateplayer/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, surname, description, date_of_birth } = req.body;
    await dbConnector.updatePlayer(id, { first_name, last_name, surname, description, date_of_birth });
    res.json({ success: true, player: { id, first_name, last_name, surname, description, date_of_birth } });
});

// Delete Player Route
app.post('/deleteplayer/:id', async (req, res) => {
    const { id } = req.params;
    await dbConnector.deletePlayer(id);
    res.json({ success: true });
});

module.exports = app;