const { src, dest, watch } = require("gulp")
const sass = require('gulp-sass')(require('sass'));
const plumber = require("gulp-plumber")


function css(cb) {
    src("src/scss/**/*.scss")//Importar el aarchivo sass
        .pipe(plumber())
        .pipe(sass()) //Compilar el archivo sass
        .pipe(dest("build/css")) //Almacenar el archivo sass
    cb();
}

function dev(cb) {
    watch("src/scss/**/*.scss", css)
    cb();
}

exports.css = css
exports.dev = dev