# nuxtjs-routes-overview

Generates a JSON file with a representation of the generated route structure in your nuxt app.

## Installation

`nuxt.config.js`:

````javascript
module.exports = {
    ...,
    buildModules: ['nuxtjs-routes-overview']
}
````

## Usage

The generated `_routes-map.json` file will be placed in the `dist/` directory.

````bash
nuxt generate
````

OR

````bash
npm run generate
````
