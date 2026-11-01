
function setStatusFilter(
  status: StatusFilter
): void {
  statusFilter.value = status;

  renderCatalog();

  getElement<HTMLElement>(
    "#catalogo"
  ).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Eventos de busca e filtros

searchInput.addEventListener(
  "input",
  renderCatalog
);

categoryFilter.addEventListener(
  "change",
  renderCatalog
);

statusFilter.addEventListener(
  "change",
  renderCatalog
);

// Evento de envio do formulário

itemForm.addEventListener(
  "submit",
  (event: SubmitEvent): void => {
    event.preventDefault();

    saveFormItem();
  }
);

// Botões de cadastro

for (const selector of [
  "#sidebar-add",
  "#empty-add"
]) {
  getElement<HTMLButtonElement>(
    selector
  ).addEventListener(
    "click",
    (): void => {
      if (
        catalog.length > 0 &&
        getVisibleItems().length === 0 &&
        selector === "#empty-add"
      ) {
        resetFilters();
        return;
      }

      openDialog();
    }
  );
}

// Eventos do modal

getElement<HTMLButtonElement>(
  "#close-dialog"
).addEventListener(
  "click",
  closeDialog
);

getElement<HTMLButtonElement>(
  "#cancel-dialog"
).addEventListener(
  "click",
  closeDialog
);

getElement<HTMLButtonElement>(
  "#clear-filters"
).addEventListener(
  "click",
  resetFilters
);

itemDialog.addEventListener(
  "click",
  (event: MouseEvent): void => {
    if (event.target === itemDialog) {
      closeDialog();
    }
  }
);

// Atalhos de filtragem por status

for (
  const button of
  document.querySelectorAll<HTMLButtonElement>(
    "[data-set-status]"
  )
) {
  button.addEventListener(
    "click",
    (): void => {
      const status: string | undefined =
        button.dataset.setStatus;

      if (
        status === "watched" ||
        status === "unwatched"
      ) {
        setStatusFilter(status);
      }
    }
  );
}

// Eventos dos cards

catalogGrid.addEventListener(
  "click",
  (event: MouseEvent): void => {
    const target: EventTarget | null =
      event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const button =
      target.closest<HTMLButtonElement>(
        "button[data-action]"
      );

    if (button === null) {
      return;
    }

    const id: string | undefined =
      button.dataset.id;

    if (id === undefined) {
      return;
    }

    // Alterna entre assistido e pendente.
    if (button.dataset.action === "toggle") {
      toggleItem(id);
    }

    // Abre o formulário preenchido para edição.
    if (button.dataset.action === "edit") {
      const item: CatalogItem | undefined =
        catalog.find(
          (entry: CatalogItem): boolean =>
            entry.id === id
        );

      if (item !== undefined) {
        openDialog(item);
      }
    }

    // Exclui o título após confirmação.
    if (button.dataset.action === "delete") {
      deleteItem(id);
    }
  }
);

// 26. Inicialização da aplicação

renderCatalog();