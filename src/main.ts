const images = Array.from(
    document.querySelectorAll<HTMLElement>('[data-responsive-image-loading]')
);

if (images.length !== 0) {
    import('./responsive-image-loading').then(({ default: initResponsiveImageLoading }) => {
        initResponsiveImageLoading(images);
    });
}

export {};
