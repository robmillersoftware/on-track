# `config/`

## Adding SVG Icons

To add new svg icons to the app first add `.svg` file(s) to
`src/assets/icons/`.

Then register the icon in `./material.config.js`.

The icons can then be referenced by name using the `md-icon` directive.

SVG icons should be sourced from [material.io/icons/](https://material.io/icons/)
Usage:

```html
<md-icon md-svg-icon="print"></md-icon>
```
