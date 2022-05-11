import { galleryItems } from './gallery-items.js';
// ---------------- Створення та рендер розмітки -----------------------

const galleryEl = document.querySelector('.gallery');

galleryEl.insertAdjacentHTML('afterbegin', markupGallery(galleryItems));

function markupGallery(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"/>
        </a>
      </div>`
    )
    .join('');
}

// ------------------ Реалізація делегування ----------------------------

galleryEl.addEventListener('click', onGalleryElClick);

function onGalleryElClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  // ---------------- Відкриття модального вікна ------------------------

  const instance = basicLightbox.create(
    `<img src="${evt.target.dataset.source}" width="800" height="600">`
  );

  instance.show();

  // ------------------- Закриття ескейпом -------------------------------------

  window.addEventListener('keydown', onWindowKeydown);

  function onWindowKeydown(evt) {
    if (evt.key !== 'Escape') {
      return;
    }

    instance.close();
    window.removeEventListener('keydown', onWindowKeydown);
  }
}
