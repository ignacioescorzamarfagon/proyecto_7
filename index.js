require('dotenv').config();
const express = require('express'); //Creamos el servidor
const { connectDB } = require('./src/config/db');
const usersRoutes = require('./src/api/routes/user');
const gamesRouter = require('./src/api/routes/game');
const consolesRouter = require('./src/api/routes/console');
const app = express(); //Ejecuto el servidor y lo guardo en una variable

connectDB(); //Conectamos con la BBDD

app.use(express.json()); //Mi servidor sera capaz de entender Json

app.use('/api/v1/users', usersRoutes); //Ruta que nos lleva a la ruta de los usuarios
app.use('/api/v1/consoles', consolesRouter); //Ruta que nos lleva a la ruta de las consolas
app.use('/api/v1/games', gamesRouter); //Ruta que nos lleva a la ruta de los juegos

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
}); //Respuesta por defecto
app.listen(3000, () => {
  console.log('El servidor está funcionando en: http://localhost:3000');
}); //El servidor escucha en el puerto 3000
//1.02.30
