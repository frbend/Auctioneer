const express = require('express');
const router = express.Router();

//Item model
const  Suggestion = require('../../models/Suggestions');

//@route GET Api/questions
//@desc Get all items
router.get('/', (req,res) => {
    Suggestion.find()
        .then(suggestions => res.json(suggestions))
});


module.exports = router;