# Container queries for images

[![NPM version](https://img.shields.io/npm/v/container-images?color=a1b858&label=)](https://www.npmjs.com/package/container-images)

Container-images is a lightweight library (0.6KB gzipped) which allows you to use container queries for images.

Unlike HTML responsive images, which are implemented with srcset,
these images are based on the container size of their parent container
and not the screen size and are therefore much easier to maintain.

## Installation
```bash
npm i container-images
```

## Typescript

```ts
import containerImages from 'container-images'

const images = Array.from(
  document.querySelectorAll<HTMLPictureElement>('[data-container-images]'),
)

if (images.length !== 0)
  containerImages(images)
```

## HTML

```html
<picture data-container-images="">
    <!-- 
        srcset and media attributes are required
        data-source-x: image url for an image with a width of x, 
            container-images will choose the best fitting image automatically.
     -->
    <source
        srcset="#"
        media="(min-width: 0)"
        data-source-400="https://via.placeholder.com/400x200.webp, https://via.placeholder.com/800x400.webp 2x"
        data-source-500="https://via.placeholder.com/500x250.webp, https://via.placeholder.com/1000x500.webp 2x"
        data-source-600="https://via.placeholder.com/600x300.webp, https://via.placeholder.com/1200x600.webp 2x"
        data-source-700="https://via.placeholder.com/700x350.webp, https://via.placeholder.com/1400x700.webp 2x"
    >

    <!-- Necessary fallback image -->
    <img
            src="https://via.placeholder.com/700x350.webp"
            width="700"
            height="350"
            alt="Placeholder image"
    >
</picture>
```

## License

[MIT](./LICENSE) License © 2023 [Felix Ranesberger](https://github.com/antfu)
