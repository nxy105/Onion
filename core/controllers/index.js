/**
 * Controller index.
 */
var index = {};

index.index = function(req, res) {
    res.render('index/index', {
        title: 'Onion'
    });
};

module.exports = index;