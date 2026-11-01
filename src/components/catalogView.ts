
function renderCatalog(): void {
  const visibleItems: CatalogItem[] =
    getVisibleItems();

  catalogGrid.innerHTML =
    visibleItems.map(renderCard).join("");

  catalogGrid.hidden =
    visibleItems.length === 0;

  emptyState.hidden =
    visibleItems.length > 0;

  catalogGrid.setAttribute(
    "aria-busy",
    "false"
  );

  if (catalog.length === 0) {
    emptyTitle.textContent =
      "Sua estante está esperando.";

    emptyDescription.textContent =
      "Adicione o primeiro filme ou série para começar sua coleção.";

    getElement<HTMLButtonElement>(
      "#empty-add"
    ).textContent =
      "+ Adicionar primeiro título";

  } else if (visibleItems.length === 0) {
    emptyTitle.textContent =
      "Nenhum título encontrado.";

    emptyDescription.textContent =
      "Tente outro termo ou ajuste os filtros para encontrar o que procura.";

    getElement<HTMLButtonElement>(
      "#empty-add"
    ).textContent =
      "Limpar filtros";
  }

  updateSummary(visibleItems.length);
  updateActiveFilters();
}

function updateSummary(
  visibleCount: number
): void {
  const watchedCount: number =
    catalog.filter(
      (item: CatalogItem): boolean => item.watched
    ).length;

  const unwatchedCount: number =
    catalog.length - watchedCount;

  getElement<HTMLElement>(
    "#stat-total"
  ).textContent =
    String(catalog.length).padStart(2, "0");

  getElement<HTMLElement>(
    "#stat-watched"
  ).textContent =
    String(watchedCount).padStart(2, "0");

  getElement<HTMLElement>(
    "#stat-unwatched"
  ).textContent =
    String(unwatchedCount).padStart(2, "0");

  getElement<HTMLElement>(
    "#nav-total"
  ).textContent =
    String(catalog.length);

  getElement<HTMLElement>(
    "#result-count"
  ).textContent =
    `${visibleCount} ${visibleCount === 1 ? "título" : "títulos"}`;
}

function updateActiveFilters(): void {
  const descriptions: string[] = [];

  if (searchInput.value.trim() !== "") {
    descriptions.push(
      `busca: “${searchInput.value.trim()}”`
    );
  }

  if (categoryFilter.value !== "all") {
    descriptions.push(categoryFilter.value);
  }

  if (statusFilter.value === "watched") {
    descriptions.push("já assistidos");
  }

  if (statusFilter.value === "unwatched") {
    descriptions.push("quero assistir");
  }

  activeFilterLine.hidden =
    descriptions.length === 0;

  activeFilterText.textContent =
    descriptions.join(" · ");
}