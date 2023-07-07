import { galleryItems } from "./gallery-items.js";


const gallery = document.querySelector(".gallery");
console.log(gallery);

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}"
      alt=${description}
    />
  </a>
</li>`
  )
  .join("");
gallery.insertAdjacentHTML("beforeend", markup);

gallery.addEventListener("click", onClick);

function onClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const largeImage = event.target.dataset.source;
  console.log(largeImage);

  const instance = basicLightbox.create(
    `
    <img src="${largeImage}" width="600" height="400">
`,
    {
      onShow: () => {
        document.addEventListener("keydown", closureModalEsc);
      },
      onClose: () => {
        document.removeEventListener("keydown", closureModalEsc);
      },
    }
  );

  instance.show();

  function closureModalEsc(event) {
    if (event.code !== "Escape") {
      return;
    }
    instance.close();

    console.log(event.code);
  }
}

console.log(galleryItems);
