let dbConfig = {
    user: 'efrenalvarez',
    password: 'gV49oi38XpOX0yMM',
    dbName: 'devcollabproject',
    dbUrl: function(){
        return `mongodb+srv://${this.user}:${this.password}@cluster0.5jyeskn.mongodb.net/${this.dbName}?retryWrites=true&w=majority
        `
    },
    jwtSecret: '2222'
}

module.exports = dbConfig;