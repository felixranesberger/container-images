# Container queries for images

Container-images is a lightweight library (0.6KB gzipped) which allows you to use container queries for images.

Unlike HTML responsive images, which are implemented with srcset, 
these images are based on the container size of their parent container 
and not the screen size and are therefore much easier to maintain.

## Installation°
```bash
npm i container-images
```

## Typescript

```ts
import containerImages from 'container-images';

const images = Array.from(
  document.querySelectorAll<HTMLPictureElement>('[data-container-images]'),
)

if (images.length !== 0) {
  containerImages(images);
}
```

## HTML

> data-container-images-loading="eager" is optional and can be used to load the images immediately

```html
<picture data-container-images="">
    <!-- 
        srcset and media attributes are required
        data-source-default: default image, if container width is below 400px
        data-source-400: image url which is loaded beginning from 400px container width
                         image source can also contain a 2x variant for Retina displays
     -->
    <source
        srcset="#"
        media="(min-width: 0)"
        data-source-default="https://via.placeholder.com/300x150.webp, https://via.placeholder.com/600x300.webp 2x"
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
