
function createId(): string {
  if (
    typeof crypto !== "undefined" &&
    "randomUUID" in crypto
  ) {
    return crypto.randomUUID();
  }

  return (
    `item-${Date.now()}-` +
    Math.random().toString(36).slice(2, 10)
  );
}

// Cadastro e edição de itens

function saveFormItem(): void {
  if (!validateForm()) {
    return;
  }

  const selectedCategory: string =
    categoryInput.value;

  const statusInput =
    itemForm.querySelector<HTMLInputElement>(
      'input[name="watched"]:checked'
    );

  if (
    !categories.includes(
      selectedCategory as Category
    ) ||
    statusInput === null
  ) {
    showToast(
      "Não consegui ler todos os campos. Dá uma conferida!"
    );

    return;
  }

  const formValues = {
    title: titleInput.value.trim(),
    category: selectedCategory as Category,
    year: Number(yearInput.value),
    watched: statusInput.value === "true"
  };

  // Se existe um ID em edição, atualiza o item.
  if (editingItemId !== null) {
    const item: CatalogItem | undefined =
      catalog.find(
        (entry: CatalogItem): boolean =>
          entry.id === editingItemId
      );

    if (item === undefined) {
      closeDialog();

      showToast(
        "Esse título não está mais no catálogo."
      );

      return;
    }

    item.title = formValues.title;
    item.category = formValues.category;
    item.year = formValues.year;
    item.watched = formValues.watched;

    saveCatalog();
    renderCatalog();
    closeDialog();

    showToast(
      `“${item.title}” foi atualizado. ✨`
    );

    return;
  }

  // Caso contrário, cria um novo item.
  const newItem: CatalogItem = {
    id: createId(),
    ...formValues
  };

  catalog = [newItem, ...catalog];

  saveCatalog();
  resetFilters();
  closeDialog();

  showToast(
    `“${newItem.title}” entrou para a coleção! 🎬`
  );
}

// Alteração do status

function toggleItem(id: string): void {
  const item: CatalogItem | undefined =
    catalog.find(
      (entry: CatalogItem): boolean =>
        entry.id === id
    );

  if (item === undefined) {
    return;
  }

  item.watched = !item.watched;

  saveCatalog();
  renderCatalog();

  showToast(
    item.watched
      ? "Título marcado como assistido."
      : "Título voltou para sua lista."
  );
}

// Exclusão de itens

function deleteItem(id: string): void {
  const item: CatalogItem | undefined =
    catalog.find(
      (entry: CatalogItem): boolean =>
        entry.id === id
    );

  if (item === undefined) {
    return;
  }

  const confirmed: boolean = window.confirm(
    `Excluir “${item.title}” do catálogo?`
  );

  if (!confirmed) {
    return;
  }

  catalog = catalog.filter(
    (entry: CatalogItem): boolean =>
      entry.id !== id
  );

  saveCatalog();
  renderCatalog();

  showToast(
    "Título removido do catálogo."
  );
}
