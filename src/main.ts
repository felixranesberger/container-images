const images = Array.from(
  document.querySelectorAll<HTMLPictureElement>('[data-responsive-image-loading]'),
);

if (images.length !== 0) {
  // @ts-ignore
  import('../dist/index').then(({ default: initModule }) => initModule(images));
}

export {};
