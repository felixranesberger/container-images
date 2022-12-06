# Container queries for images

This library allows loading images depending on the container size. 

Unlike HTML responsive images, which are implemented with srcset, 
these images are based on the container size of their parent container 
and not the screen size and are therefore much easier to maintain.

## Installation
```bash
npm i container-images
```

## Typescript

```ts
const images = Array.from(
    document.querySelectorAll<HTMLPictureElement>('[data-container-images]'),
);

if (images.length !== 0) {
    import('container-images').then(({ default: initModule }) => {
        initModule(images)
    });
}
```

## HTML

```html
<picture data-container-images="">
    <!-- 
        srcset and media attributes are required
        data-source-default: default image, if container width is below 400px
        data-source-400: image url which is loaded beginning from 400px container width
     -->
    <source
            srcset="#"
            media="(min-width: 0)"
            data-source-default="https://via.placeholder.com/300x150.webp"
            data-source-400="https://via.placeholder.com/400x200.webp"
            data-source-500="https://via.placeholder.com/500x250.webp"
            data-source-600="https://via.placeholder.com/600x300.webp"
            data-source-700="https://via.placeholder.com/700x350.webp"
    >

    <!-- Necessary fallback image -->
    <img
            src="https://via.placeholder.com/700x350.webp"
            width="700"
            height="350"
            loading="lazy"
            alt="Placeholder image"
    >
</picture>
```
