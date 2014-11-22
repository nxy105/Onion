/**
 * Controller index.
 */
var session = require('../session')
  , userModel = require('../models/user')
  , indexController;

indexController = {

    /**
     * index action
     *
     * @param  object req  request object
     * @param  object res  response object
     * @return void
     */
    index: function(req, res) {
        var userId, stream;

        // if user is not loginned
        if (!session.checkUserLogin(req)) {
            return res.redirect('/login');
        }

        userId = session.getLoginnedUserId(req);
        return userModel.get(userId).then(function(user) {
            if (!user) {
                return res.redirect('/login');
            }

            stream = {
                user: {
                    userId: user.userId,
                    username: user.username
                },
            };

            return res.render('app/index', {stream : JSON.stringify(stream)});
        });
    }
};

module.exports = indexController;