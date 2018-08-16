import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import async from 'rollup-plugin-async';

export default {
    input: 'src/index.js',
    output: {
        file: 'cordova-dist/www/js/bundle.js',
        format: 'iife',
        name: 'app'        
    },
    plugins: [
        async(),
        babel({
            exclude: 'node_modules/**'
        }),
        // uglify()
    ]
}

