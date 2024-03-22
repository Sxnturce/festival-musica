const { src, dest, watch, parallel } = require("gulp")

//CSS
const sass = require('gulp-sass')(require('sass'));

//Errores
const plumber = require("gulp-plumber")

//Imagenes

const webp = require("gulp-webp")

function css(cb) {
    src("src/scss/**/*.scss")//Importar el aarchivo sass
        .pipe(plumber())
        .pipe(sass()) //Compilar el archivo sass
        .pipe(dest("build/css")) //Almacenar el archivo sass
    cb();
}


function versionWebp(cb) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(options))
        .pipe(dest("build/img"))
    cb()
}

function dev(cb) {
    watch("src/scss/**/*.scss", css)
    cb();
}

exports.css = css
exports.versionWebp = versionWebp
exports.dev = parallel(versionWebp, dev)