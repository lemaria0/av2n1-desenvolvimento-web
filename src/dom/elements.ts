// Seleção de elementos do DOM

function getElement<T extends HTMLElement>(
  selector: string
): T {
  const element: Element | null =
    document.querySelector(selector);

  if (!(element instanceof HTMLElement)) {
    throw new Error(
      `Elemento obrigatório não encontrado: ${selector}`
    );
  }

  return element as T;
}

const catalogGrid =
  getElement<HTMLDivElement>("#catalog-grid");

const emptyState =
  getElement<HTMLDivElement>("#empty-state");

const emptyTitle =
  getElement<HTMLHeadingElement>("#empty-title");

const emptyDescription =
  getElement<HTMLParagraphElement>("#empty-description");

const searchInput =
  getElement<HTMLInputElement>("#search-input");

const categoryFilter =
  getElement<HTMLSelectElement>("#category-filter");

const statusFilter =
  getElement<HTMLSelectElement>("#status-filter");

const itemDialog =
  getElement<HTMLDialogElement>("#item-dialog");

const itemForm =
  getElement<HTMLFormElement>("#item-form");

const titleInput =
  getElement<HTMLInputElement>("#title-input");

const categoryInput =
  getElement<HTMLSelectElement>("#category-input");

const dialogTitleLabel =
  getElement<HTMLSpanElement>("#dialog-title-label");

const dialogKicker =
  getElement<HTMLSpanElement>("#dialog-kicker");

const dialogDescription =
  getElement<HTMLParagraphElement>("#dialog-description");

const submitLabel =
  getElement<HTMLSpanElement>("#submit-label");

const submitIcon =
  getElement<HTMLSpanElement>("#submit-icon");

const yearInput =
  getElement<HTMLInputElement>("#year-input");

const titleError =
  getElement<HTMLElement>("#title-error");

const yearError =
  getElement<HTMLElement>("#year-error");

const errorSummary =
  getElement<HTMLDivElement>("#form-error-summary");

const toast =
  getElement<HTMLDivElement>("#toast");

const activeFilterLine =
  getElement<HTMLDivElement>("#active-filter-line");

const activeFilterText =
  getElement<HTMLSpanElement>("#active-filter-text");

// Estado da aplicação

let catalog: CatalogItem[] = loadCatalog();

let editingItemId: string | null = null;

let toastTimeout: number | undefined;
