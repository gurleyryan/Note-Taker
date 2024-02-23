const router = require('express').Router();
const notes = require('./notesRoutes');

router.use('/notes', notes);

module.exports = router;