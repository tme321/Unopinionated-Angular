# UnopinionatedAngularToolbox

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:8080/`. The demo app will automatically reload if you change any of the source files.

## Build
Run `npm run build` to build the aot version of the library. 
Run `npm run bundle` to build the entire library as a single bundle.
Run `npm run prepublish` to build both the aot version and the bundle version.
The output will be in ./dist.

## Generate Documentation
Run `npm run genDoc` to generate the documentation in ./doc.  This uses typedoc
with a theme called typedoc-md-theme to create the markdown.  This theme package
exists on npm and works but the github page no longer exists so moving to a new
generator in the future is likely.

## Deploying to Github Pages
Run `npm run deploy` to deploy to Github Pages.

## API Documentation
[Library Documentation..](https://tme321.github.io/Unopinionated-Angular/) 
