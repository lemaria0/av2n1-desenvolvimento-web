// Carregamento e armazenamento
function loadCatalog(): CatalogItem[] {
  try {
    const stored: string | null =
      localStorage.getItem(STORAGE_KEY);

    if (stored === null) {
      return demoItems.map(
        (item: CatalogItem) => ({ ...item })
      );
    }

    const parsed: unknown = JSON.parse(stored);

    if (
      Array.isArray(parsed) &&
      parsed.every(isCatalogItem)
    ) {
      return parsed;
    }
  } catch {
    // A aplicação continua funcionando
    // mesmo se houver problemas no armazenamento.
  }

  return demoItems.map(
    (item: CatalogItem) => ({ ...item })
  );
}

function isCatalogItem(
  value: unknown
): value is CatalogItem {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.category === "string" &&
    categories.includes(item.category as Category) &&
    typeof item.year === "number" &&
    Number.isInteger(item.year) &&
    typeof item.watched === "boolean"
  );
}

function saveCatalog(): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(catalog)
    );
  } catch {
    showToast(
      "Alterações válidas para esta sessão; armazenamento indisponível."
    );
  }
}

