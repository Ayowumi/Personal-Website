dbPassword = 'mongodb://root:'+ encodeURIComponent('rootpassword') + '@0.0.0.0:27017/?authSource=admin&retryWrites=true';

module.exports = {
    mongoURI: dbPassword
};
