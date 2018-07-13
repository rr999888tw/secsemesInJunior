const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
    res.send("index")
})
router.get('/yo', function (req, res) {
    res.send("yo")
})
router.get('/yaya', function (req, res) {
    res.send("yaya")
})

module.exports = router;