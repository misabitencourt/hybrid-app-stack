import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'src/index.js',
    output: {
        file: 'cordova-dist/www/js/bundle.js',
        format: 'iife',
        name: 'app'        
    },
    plugins: [
        // babel({
        //     exclude: 'node_modules/**',
        // }),
        // uglify()
    ]
}