var colors       = require('colors')
var path         = require('path')

var express      = require('express')
var compression  = require('compression')
var serveStatic  = require('serve-static')
var cookieParser = require('cookie-parser')

var argv         = require('yargs')
                    .alias('s', 'https')
                    .boolean('s')
                    .alias('h', 'host')
                    .string('h')
                    .default('h', '0.0.0.0')
                    .alias('p', 'port')
                    .default('p', '8000')
                    .alias('r', 'root')
                    .string('r')
                    .default('r', './')
                    .argv
argv.root = path.join(__dirname, argv.root)


var server = express()
server.disable('x-powered-by')

// compress output
server.use(compression({
  threshold: 512
}))

server.use(cookieParser())

server.use(serveStatic(argv.root))
//server.use(express.static(argv.root));

// on capture les erreurs eventuelles et on les passe handler suivant
server.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

server.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.end(err.message)
})

server.listen(argv.port, argv.host, function () {
    var uri = [argv.ssl ? 'https' : 'http', '://', argv.host, ':', argv.port].join('')

    console.log('Starting up server, serving '.yellow
                + argv.root.cyan
                + ((argv.ssl) ? ' through'.yellow + ' https'.cyan : '')
                + ' on '.yellow
                + uri.cyan)

    console.log('Hit CTRL-C to stop the server')
})