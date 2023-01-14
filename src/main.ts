const images = Array.from(
  document.querySelectorAll<HTMLPictureElement>('[data-container-images]'),
)

if (images.length !== 0) {
  import('../dist/index')
    .then(({ default: initModule }) => initModule(images))
    .catch(console.error)
}

export {}
