module.exports = {
    content: [
        "./src/*.{html,css,js,jsx}",
        "./src/*/*.{html,css,js,jsx}",
        "./src/*/*/*.{html,css,js,jsx}"
    ],
    /*from : 'src/tailwind.css',
    to: 'src/styles.css',*/
    theme: {
      extend: {},
    },
    plugins: [],
}