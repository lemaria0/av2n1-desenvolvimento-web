
function renderCard(
  item: CatalogItem,
  index: number
): string {
  const safeTitle: string =
    escapeHTML(item.title);

  const watchedLabel: string =
    item.watched
      ? "Já assisti"
      : "Quero assistir";

  const statusClass: string =
    item.watched ? "" : " pending";

  const statusIcon: string =
    item.watched ? "✓" : "◷";

  const toggleIcon: string = item.watched
    ? '<path d="m5 12 4 4L19 6"/>'
    : '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';

  const toggleText: string =
    item.watched ? "Desmarcar" : "Concluir";

  return `
    <article
      class="movie-card"
      data-item-id="${escapeHTML(item.id)}"
    >
      <div class="movie-art ${getArtClass(item.category)}">

        <span class="art-number">
          CS / ${String(index + 1).padStart(2, "0")}
        </span>

        <span class="category-pill">
          ${getCategoryLabel(item.category)}
        </span>

        <span class="watched-pill${statusClass}">
          ${statusIcon} ${watchedLabel}
        </span>

        <span class="art-shape"></span>
        <span class="art-sun"></span>
        <span class="art-mountain"></span>

        <span class="art-glyph">
          ${getInitial(item.title)}
        </span>

        <span class="art-label">
          ${safeTitle}
        </span>
      </div>

      <div class="movie-info">
        <div class="movie-info-top">
          <div>
            <h3 class="movie-title">
              ${safeTitle}
            </h3>

            <div class="movie-year">
              ${item.year}
              <span aria-hidden="true">·</span>
              ${escapeHTML(item.category)}
            </div>
          </div>
        </div>

        <div class="movie-actions">

          <button
            class="card-action ${item.watched ? "is-watched" : ""}"
            type="button"
            data-action="toggle"
            data-id="${escapeHTML(item.id)}"
            aria-label="${item.watched ? "Marcar como não assistido" : "Marcar como assistido"}: ${safeTitle}"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              ${toggleIcon}
            </svg>

            ${toggleText}
          </button>

          <button
            class="card-action edit-action"
            type="button"
            data-action="edit"
            data-id="${escapeHTML(item.id)}"
            aria-label="Editar ${safeTitle}"
            title="Editar título"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 5 4 4M4 20l4.3-1 10.9-10.9a2.1 2.1 0 0 0-3-3L5.3 16 4 20Z"/>
            </svg>
          </button>

          <button
            class="card-action delete-action"
            type="button"
            data-action="delete"
            data-id="${escapeHTML(item.id)}"
            aria-label="Excluir ${safeTitle}"
            title="Excluir título"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/>
            </svg>
          </button>

        </div>
      </div>
    </article>
  `;
}