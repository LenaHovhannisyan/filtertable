const express = require("express");
const router = express.Router();

const connection = require("./db");

router.get('/records', function (req, res) {
    connection.query('SELECT * FROM store', function (error, results, fields) {
        if (error) throw error;
        // console.log(results);
        return res.send({error: false, data: results, message: 'records list.'});
    });
});

router.post('/add_record', function (req, res) {
    const insertData = req.body;
    insertData.date = new Date(insertData.date)

    if (!insertData) {
        return res.status(400).send({error: true, message: 'Please provide a record'});
    }

    connection.query("INSERT INTO store SET ? ", insertData, function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'New record has been created successfully.'});
    });
});

module.exports = router;