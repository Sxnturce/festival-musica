const { src, dest, watch, parallel } = require("gulp")

//CSS
const sass = require('gulp-sass')(require('sass'));

//Errores
const plumber = require("gulp-plumber")

//Imagenes
/* const cache = require("gulp-cache") */
const webp = require("gulp-webp")
const imgmin = require("gulp-imagemin")
const avif = require("gulp-avif")

function css(cb) {
    src("src/scss/**/*.scss")//Importar el aarchivo sass
        .pipe(plumber())
        .pipe(sass()) //Compilar el archivo sass
        .pipe(dest("build/css")) //Almacenar el archivo sass
    cb();
}

function imgMin(cb) {
    const options = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(imgmin(options))
        .pipe(dest("build/img"))
    cb()
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

function versionAvif(cb) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(options))
        .pipe(dest("build/img"))
    cb()
}

function dev(cb) {
    watch("src/scss/**/*.scss", css)
    cb();
}

exports.css = css
exports.versionWebp = versionWebp
exports.versionAvif = versionAvif
exports.imgMin = imgMin
exports.dev = parallel(imgMin, versionAvif, versionWebp, dev)