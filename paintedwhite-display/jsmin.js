var jsmin = require('jsmin').jsmin;
var path = require('path')
var fs = require('fs')

fs.writeFileSync(path.resolve('./dist/js', 'config.js'), jsmin(fs.readFileSync(path.resolve('./public/js', 'config.js')).toString()))
var files = fs.readdirSync(path.resolve('./public', 'js/page'))
files.forEach(file => {
    fs.writeFileSync(path.resolve('./dist/js/page', file), jsmin(fs.readFileSync(path.resolve('./public/js/page', file)).toString()))
})

var jsons = fs.readdirSync(path.resolve('./public', 'configs'))
jsons.forEach(file => {
    fs.writeFileSync(path.resolve('./dist/configs', file), jsmin(fs.readFileSync(path.resolve('./public/configs', file)).toString()))
})