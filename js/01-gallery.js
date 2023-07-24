import {galleryItems} from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const galleryItemsEl = document.querySelector(".gallery");
const galleryItemsMarkup = createGalleryItems(galleryItems);

function createGalleryItems(items) {
  return items
    .map(({preview, description, original}) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li> `;
    })
    .join("");
}

galleryItemsEl.insertAdjacentHTML("beforeend", galleryItemsMarkup);
galleryItemsEl.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.className !== "gallery__image") {
    return;
  }

  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);

  instance.show();

  if (instance.visible()) {
    document.addEventListener("keydown", onEsc);
    function onEsc(event) {
      if (event.code === "Escape") {
        instance.close();
        document.removeEventListener("keydown", onEsc);
      }
    }
  }
}
