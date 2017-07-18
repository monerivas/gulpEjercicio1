var gulp = require('gulp');
var uglify = require('gulp-uglify');
var obfuscate = require("gulp-obfuscate");
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var rutas = {
    rutaJS: 'src/assets/js/*.js',
    rutaCSS: 'src/assets/scss/*.scss',
    rutaHTML: 'src/*.html'
    /*El uso de * significa busca en todo el proyecto cualquier cosa que tenga.js*/
}


//-------------------------------------------------
/*glup.src sirve para entrar a la ruta donde esta el archivo  SCSS, el 1er pipe es donde se comprime el sass, el 2do pipe dice que si hay un error ,amde un mensaje de error, 3er pipe le dice que la compresion la guarde en un destino que en este caso es la carpeta minificado denytro d ela carpeta public*/
/*Esta tarea tiene accion, ruta*/
gulp.task('prepararJS', function () {
    return gulp.src(rutas.rutaJS) /*El return hace que las tareas se vuelvan asincornas, si no le sabemos bien, es mejor dejar todas sincronas*/
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('public/minificado'))
})

gulp.task('prepararCSS', function () {
    gulp.src(rutas.rutaCSS)
        .pipe(sass({
                outputStyle: 'compressed'
            })
            .on('error', sass.logError))
        .pipe(gulp.dest('public/css'))
});

gulp.task('copiarHTML', function () {
    gulp.src(rutas.rutaHTML)
        .pipe(gulp.dest('public/'))
})

/* NOTAS
./blabla una antes
../blabla dos antes
blabla/ una despues
* nombreArchivo dentro de esa carpeta
** busca el archivo en cualquier lado dentro del directorio donde estoyejecutando esto, osea d emi carpeta raiz*/


//----------------------------------------------
/*Este metodo hace que cuando haya un cambio en esa funcion se ejecute automaticamente en terminal sin que yo lo tenga que estar haciendo manualmente*/
gulp.task('watchChanges', function () {
    /*Aqui meto la funcion de browers-sync poque esta tarea es la unica que YO voy a correr, las demas seran corridas por mis tareas de automatizacion*/

    browserSync.init({ /*esto inicia el servidor y le dice que lo que va a mostrar esta en la carpeta publics*/
        server: {
            baseDir: './public'
        }
    })
    gulp.watch(rutas.rutaCSS, ['sass-watch'])
    gulp.watch(rutas.rutaJS, ['sass-watch'])
    gulp.watch(rutas.rutaHTML, ['sass-watch'])
    /*El primer parametro es que ruta, que lugar va a vigilar y el segundo es que es lo que ejecutara cuando algo cambie en esa ruta*/
});


/*El primer parametro es el nombre se esta tarea, el segundo es la tarea/accion (que en este caso trae dentro de si misma una ruta/lugar) y el tercero es otra tarea/accion a ejecutar*/
gulp.task('sass-watch', ['prepararCSS', 'prepararJS', 'copiarHTML'], function () {
    browserSync.reload();
})


//-------------------------------------------------