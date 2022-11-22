# Container queries for images

This library allows to load images depending on the container size. 

Unlike HTML responsive images, which are implemented with srcset, 
these images are based on the container size of their parent container 
and not the screen size and are therefore much easier to maintain.

## Typescript

```ts
const images = Array.from(
    document.querySelectorAll<HTMLPictureElement>('[data-responsive-image-loading]'),
);

if (images.length !== 0) {
    const { default: initModule } = 
    
    import('container-images').then(({ default: initModule }) => {
        initModule(images)
    });
}
```

## HTML

```html

<picture data-responsive-image-loading="">
    <!-- 
        srcset and media attributes are required
        data-source-default: default image, if no image matches image size
        data-source-500: image url which is loaded beginning from 500px image width
     -->
    <source
            srcset="#"
            media="(min-width: 0)"
            data-source-default="https://picsum.photos/750/375"
            data-source-250="https://picsum.photos/250/125"
            data-source-500="https://picsum.photos/500/250"
            data-source-750="https://picsum.photos/750/375"
    >

    <!-- Fallback image, which is necessary -->
    <img
            src="https://picsum.photos/750/375"
            alt=""
            width="800"
            height="400"
            loading="lazy"
    >
</picture>
```
