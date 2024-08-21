import purify from 'purify-css';
import glob from 'glob';

// Use glob to dynamically find all relevant files
const contentGlob = 'src/**/*.{js,jsx,ts,tsx}';
const cssGlob = 'src/**/*.css';

// Use glob.sync to get an array of file paths
const content = glob.sync(contentGlob);
const css = glob.sync(cssGlob);

const options = {
    output: 'purifyAndMinified.css',
    minify: true,
    info: true
};

purify(content, css, options, function (purifiedAndMinifiedResult) {
    console.log(purifiedAndMinifiedResult);
});