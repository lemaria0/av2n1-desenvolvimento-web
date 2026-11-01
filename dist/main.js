"use strict";
// Tipos e interfaces
// Constantes e dados iniciais
const STORAGE_KEY = "cineshelf-catalog-v1";
const categories = [
    "Filme",
    "Série",
    "Documentário",
    "Anime"
];
const demoItems = [
    {
        id: "demo-1",
        title: "Interestelar",
        category: "Filme",
        year: 2014,
        watched: true
    },
    {
        id: "demo-2",
        title: "Ruptura",
        category: "Série",
        year: 2022,
        watched: false
    },
    {
        id: "demo-3",
        title: "Planeta Terra",
        category: "Documentário",
        year: 2006,
        watched: false
    },
    {
        id: "demo-4",
        title: "Your Name",
        category: "Anime",
        year: 2016,
        watched: true
    },
    {
        id: "demo-5",
        title: "Duna: Parte Dois",
        category: "Filme",
        year: 2024,
        watched: false
    },
    {
        id: "demo-6",
        title: "The Bear",
        category: "Série",
        year: 2022,
        watched: true
    },
    {
        id: "demo-7",
        title: "A Vida no Nosso Planeta",
        category: "Documentário",
        year: 2023,
        watched: false
    },
    {
        id: "demo-8",
        title: "A Viagem de Chihiro",
        category: "Anime",
        year: 2001,
        watched: true
    }
];

// Seleção de elementos do DOM

function getElement(selector) {
    const element = document.querySelector(selector);
    if (!(element instanceof HTMLElement)) {
        throw new Error(`Elemento obrigatório não encontrado: ${selector}`);
    }
    return element;
}
const catalogGrid = getElement("#catalog-grid");
const emptyState = getElement("#empty-state");
const emptyTitle = getElement("#empty-title");
const emptyDescription = getElement("#empty-description");
const searchInput = getElement("#search-input");
const categoryFilter = getElement("#category-filter");
const statusFilter = getElement("#status-filter");
const itemDialog = getElement("#item-dialog");
const itemForm = getElement("#item-form");
const titleInput = getElement("#title-input");
const categoryInput = getElement("#category-input");
const dialogTitleLabel = getElement("#dialog-title-label");
const dialogKicker = getElement("#dialog-kicker");
const dialogDescription = getElement("#dialog-description");
const submitLabel = getElement("#submit-label");
const submitIcon = getElement("#submit-icon");
const yearInput = getElement("#year-input");
const titleError = getElement("#title-error");
const yearError = getElement("#year-error");
const errorSummary = getElement("#form-error-summary");
const toast = getElement("#toast");
const activeFilterLine = getElement("#active-filter-line");
const activeFilterText = getElement("#active-filter-text");

// Estado da aplicação

let catalog = loadCatalog();
let editingItemId = null;
let toastTimeout;

// Carregamento e armazenamento

function loadCatalog() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === null) {
            return demoItems.map((item) => ({ ...item }));
        }
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) &&
            parsed.every(isCatalogItem)) {
            return parsed;
        }
    }
    catch {
        // A aplicação continua funcionando mesmo se houver problemas no armazenamento.
    }
    return demoItems.map((item) => ({ ...item }));
}
function isCatalogItem(value) {
    if (typeof value !== "object" ||
        value === null) {
        return false;
    }
    const item = value;
    return (typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.category === "string" &&
        categories.includes(item.category) &&
        typeof item.year === "number" &&
        Number.isInteger(item.year) &&
        typeof item.watched === "boolean");
}
function saveCatalog() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
    }
    catch {
        showToast("Alterações válidas para esta sessão; armazenamento indisponível.");
    }
}

// Segurança na exibição de textos

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#39;"
        };
        return entities[character] ?? character;
    });
}

// Busca e filtros

function getVisibleItems() {
    const query = searchInput.value
        .trim()
        .toLocaleLowerCase("pt-BR");
    const selectedCategory = categoryFilter.value;
    const selectedStatus = statusFilter.value;
    return catalog.filter((item) => {
        const matchesTitle = item.title
            .toLocaleLowerCase("pt-BR")
            .includes(query);
        const matchesCategory = selectedCategory === "all" ||
            item.category === selectedCategory;
        const matchesStatus = selectedStatus === "all" ||
            (selectedStatus === "watched" &&
                item.watched) ||
            (selectedStatus === "unwatched" &&
                !item.watched);
        return (matchesTitle &&
            matchesCategory &&
            matchesStatus);
    });
}

// Funções auxiliares para os cards

function getArtClass(category) {
    const artClasses = {
        "Filme": "art-film",
        "Série": "art-series",
        "Documentário": "art-documentary",
        "Anime": "art-anime"
    };
    return artClasses[category];
}
function getCategoryLabel(category) {
    return category === "Documentário"
        ? "DOC"
        : category.toLocaleUpperCase("pt-BR");
}
function getInitial(title) {
    const trimmed = title.trim();
    return escapeHTML(trimmed.length > 0
        ? trimmed.charAt(0).toLocaleUpperCase("pt-BR")
        : "?");
}

// Criação dos cards

function renderCard(item, index) {
    const safeTitle = escapeHTML(item.title);
    const watchedLabel = item.watched
        ? "Já assisti"
        : "Quero assistir";
    const statusClass = item.watched ? "" : " pending";
    const statusIcon = item.watched ? "✓" : "◷";
    const toggleIcon = item.watched
        ? '<path d="m5 12 4 4L19 6"/>'
        : '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';
    const toggleText = item.watched ? "Desmarcar" : "Concluir";
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

// Exibição e atualização do catálogo

function renderCatalog() {
    const visibleItems = getVisibleItems();
    catalogGrid.innerHTML =
        visibleItems.map(renderCard).join("");
    catalogGrid.hidden =
        visibleItems.length === 0;
    emptyState.hidden =
        visibleItems.length > 0;
    catalogGrid.setAttribute("aria-busy", "false");
    if (catalog.length === 0) {
        emptyTitle.textContent =
            "Sua estante está esperando.";
        emptyDescription.textContent =
            "Adicione o primeiro filme ou série para começar sua coleção.";
        getElement("#empty-add").textContent =
            "+ Adicionar primeiro título";
    }
    else if (visibleItems.length === 0) {
        emptyTitle.textContent =
            "Nenhum título encontrado.";
        emptyDescription.textContent =
            "Tente outro termo ou ajuste os filtros para encontrar o que procura.";
        getElement("#empty-add").textContent =
            "Limpar filtros";
    }
    updateSummary(visibleItems.length);
    updateActiveFilters();
}
function updateSummary(visibleCount) {
    const watchedCount = catalog.filter((item) => item.watched).length;
    const unwatchedCount = catalog.length - watchedCount;
    getElement("#stat-total").textContent =
        String(catalog.length).padStart(2, "0");
    getElement("#stat-watched").textContent =
        String(watchedCount).padStart(2, "0");
    getElement("#stat-unwatched").textContent =
        String(unwatchedCount).padStart(2, "0");
    getElement("#nav-total").textContent =
        String(catalog.length);
    getElement("#result-count").textContent =
        `${visibleCount} ${visibleCount === 1 ? "título" : "títulos"}`;
}
function updateActiveFilters() {
    const descriptions = [];
    if (searchInput.value.trim() !== "") {
        descriptions.push(`busca: “${searchInput.value.trim()}”`);
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

// Limpeza dos filtros

function resetFilters() {
    searchInput.value = "";
    categoryFilter.value = "all";
    statusFilter.value = "all";
    renderCatalog();
}

// Notificações

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    if (toastTimeout !== undefined) {
        window.clearTimeout(toastTimeout);
    }
    toastTimeout = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// Abrir formulário de cadastro ou edição

function openDialog(item) {
    itemForm.reset();
    editingItemId = item?.id ?? null;
    titleError.textContent = "";
    yearError.textContent = "";
    titleInput.classList.remove("invalid");
    yearInput.classList.remove("invalid");
    errorSummary.hidden = true;
    if (item !== undefined) {
        // Preenche o formulário para edição.
        titleInput.value = item.title;
        categoryInput.value = item.category;
        yearInput.value = String(item.year);
        const statusInput = itemForm.querySelector(`input[name="watched"][value="${String(item.watched)}"]`);
        if (statusInput !== null) {
            statusInput.checked = true;
        }
        dialogKicker.textContent =
            "DANDO UM TAPA NA ESTANTE";
        dialogTitleLabel.textContent =
            "Editar título";
        dialogDescription.textContent =
            "Mude o que quiser e deixe tudo do seu jeito.";
        submitIcon.textContent = "✎";
        submitLabel.textContent =
            "Salvar alterações";
    }
    else {
        // Prepara o formulário para um novo cadastro.
        dialogKicker.textContent =
            "NOVA ENTRADA";
        dialogTitleLabel.textContent =
            "Adicionar título";
        dialogDescription.textContent =
            "Bora colocar mais uma história na sua lista?";
        submitIcon.textContent = "+";
        submitLabel.textContent =
            "Salvar título";
    }
    itemDialog.showModal();
    window.setTimeout(() => titleInput.focus(), 0);
}
function closeDialog() {
    itemDialog.close();
}

// Validação do formulário

function validateForm() {
    const title = titleInput.value.trim();
    const rawYear = yearInput.value.trim();
    const year = Number(rawYear);
    let valid = true;
    titleError.textContent = "";
    yearError.textContent = "";
    titleInput.classList.remove("invalid");
    yearInput.classList.remove("invalid");
    if (title.length === 0) {
        titleError.textContent =
            "Informe o nome do filme ou série.";
        titleInput.classList.add("invalid");
        valid = false;
    }
    if (rawYear === "" ||
        !Number.isInteger(year) ||
        year < 1888 ||
        year > 2100) {
        yearError.textContent =
            "Informe um ano inteiro entre 1888 e 2100.";
        yearInput.classList.add("invalid");
        valid = false;
    }
    errorSummary.hidden = valid;
    return valid;
}

// 15. Geração de identificadores

function createId() {
    if (typeof crypto !== "undefined" &&
        "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return (`item-${Date.now()}-` +
        Math.random().toString(36).slice(2, 10));
}

// 16. Cadastro e edição de itens

function saveFormItem() {
    if (!validateForm()) {
        return;
    }
    const selectedCategory = categoryInput.value;
    const statusInput = itemForm.querySelector('input[name="watched"]:checked');
    if (!categories.includes(selectedCategory) ||
        statusInput === null) {
        showToast("Não consegui ler todos os campos. Dá uma conferida!");
        return;
    }
    const formValues = {
        title: titleInput.value.trim(),
        category: selectedCategory,
        year: Number(yearInput.value),
        watched: statusInput.value === "true"
    };
    // Se existe um ID em edição, atualiza o item.
    if (editingItemId !== null) {
        const item = catalog.find((entry) => entry.id === editingItemId);
        if (item === undefined) {
            closeDialog();
            showToast("Esse título não está mais no catálogo.");
            return;
        }
        item.title = formValues.title;
        item.category = formValues.category;
        item.year = formValues.year;
        item.watched = formValues.watched;
        saveCatalog();
        renderCatalog();
        closeDialog();
        showToast(`“${item.title}” foi atualizado. ✨`);
        return;
    }
    // Caso contrário, cria um novo item.
    const newItem = {
        id: createId(),
        ...formValues
    };
    catalog = [newItem, ...catalog];
    saveCatalog();
    resetFilters();
    closeDialog();
    showToast(`“${newItem.title}” entrou para a coleção! 🎬`);
}

// Alteração do status

function toggleItem(id) {
    const item = catalog.find((entry) => entry.id === id);
    if (item === undefined) {
        return;
    }
    item.watched = !item.watched;
    saveCatalog();
    renderCatalog();
    showToast(item.watched
        ? "Título marcado como assistido."
        : "Título voltou para sua lista.");
}

// Exclusão de itens

function deleteItem(id) {
    const item = catalog.find((entry) => entry.id === id);
    if (item === undefined) {
        return;
    }
    const confirmed = window.confirm(`Excluir “${item.title}” do catálogo?`);
    if (!confirmed) {
        return;
    }
    catalog = catalog.filter((entry) => entry.id !== id);
    saveCatalog();
    renderCatalog();
    showToast("Título removido do catálogo.");
}

// Navegação por status

function setStatusFilter(status) {
    statusFilter.value = status;
    renderCatalog();
    getElement("#catalogo").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Eventos de busca e filtros

searchInput.addEventListener("input", renderCatalog);
categoryFilter.addEventListener("change", renderCatalog);
statusFilter.addEventListener("change", renderCatalog);

// Evento de envio do formulário

itemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveFormItem();
});

// Botões de cadastro

for (const selector of [
    "#sidebar-add",
    "#empty-add"
]) {
    getElement(selector).addEventListener("click", () => {
        if (catalog.length > 0 &&
            getVisibleItems().length === 0 &&
            selector === "#empty-add") {
            resetFilters();
            return;
        }
        openDialog();
    });
}

// Eventos do modal

getElement("#close-dialog").addEventListener("click", closeDialog);
getElement("#cancel-dialog").addEventListener("click", closeDialog);
getElement("#clear-filters").addEventListener("click", resetFilters);
itemDialog.addEventListener("click", (event) => {
    if (event.target === itemDialog) {
        closeDialog();
    }
});

// Atalhos de filtragem por status

for (const button of document.querySelectorAll("[data-set-status]")) {
    button.addEventListener("click", () => {
        const status = button.dataset.setStatus;
        if (status === "watched" ||
            status === "unwatched") {
            setStatusFilter(status);
        }
    });
}

// Eventos dos cards

catalogGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
        return;
    }
    const button = target.closest("button[data-action]");
    if (button === null) {
        return;
    }
    const id = button.dataset.id;
    if (id === undefined) {
        return;
    }
    // Alterna entre assistido e pendente.
    if (button.dataset.action === "toggle") {
        toggleItem(id);
    }
    // Abre o formulário preenchido para edição.
    if (button.dataset.action === "edit") {
        const item = catalog.find((entry) => entry.id === id);
        if (item !== undefined) {
            openDialog(item);
        }
    }
    // Exclui o título após confirmação.
    if (button.dataset.action === "delete") {
        deleteItem(id);
    }
});

// Inicialização da aplicação

renderCatalog();