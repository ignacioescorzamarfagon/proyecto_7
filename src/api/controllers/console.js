const Console = require('../models/console');

const getConsoles = async (req, res, next) => {
  try {
    const consoles = await Console.find().populate('juegos');
    return res.status(200).json(consoles);
  } catch (error) {
    return res.status(400).json('Error al obtener la consola ' + error);
  }
};

const getConsolesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const console = await Console.findById(id);
    return res.status(200).json(console);
  } catch (error) {
    return res
      .status(400)
      .json('Error al obtener la consola por id:  ' + error);
  }
};

const getConsolesByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params;
    const consoles = await Console.find({ precio: { $lt: precio } });
    return res.status(200).json(consoles);
  } catch (error) {
    return res
      .status(400)
      .json('Error al obtener las consolas por precio menor a: ' + error);
  }
};

const postConsole = async (req, res, next) => {
  try {
    const newConsole = new Console(req.body);
    const consoleSaved = await newConsole.save();
    return res.status(200).json(consoleSaved);
  } catch (error) {
    return res.status(400).json('Error al crear una consola nueva: ' + error);
  }
};

const putConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldConsole = await Console.findById(id);
    const newConsole = new Console(req.body);
    newConsole._id = id;
    newConsole.juegos = [...oldConsole.juegos, ...req.body.juegos];
    const consoleUpdated = await Console.findByIdAndUpdate(id, newConsole, {
      new: true
    });
    return res.status(200).json(consoleUpdated);
  } catch (error) {
    return res.status(400).json('Error al actualizar una consola: ' + error);
  }
};

const deleteConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const consoleDeleted = await Console.findByIdAndDelete(id);
    return res.status(200).json(consoleDeleted);
  } catch (error) {
    return res.status(400).json('Error al eliminar una consola: ' + error);
  }
};

module.exports = {
  getConsoles,
  getConsolesById,
  getConsolesByPrice,
  postConsole,
  putConsole,
  deleteConsole
};
