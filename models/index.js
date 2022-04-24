const bookshelf = require('../bookshelf')

const Country = bookshelf.model('Country', {
    tableName:'country'
});

module.exports = { Country };