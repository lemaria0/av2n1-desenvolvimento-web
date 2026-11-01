
function resetFilters(): void {
  searchInput.value = "";
  categoryFilter.value = "all";
  statusFilter.value = "all";

  renderCatalog();
}

// Notificações

function showToast(message: string): void {
  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimeout !== undefined) {
    window.clearTimeout(toastTimeout);
  }

  toastTimeout = window.setTimeout(
    (): void => {
      toast.classList.remove("show");
    },
    2600
  );
}

// Abrir formulário de cadastro ou edição

function openDialog(
  item?: CatalogItem
): void {
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

    const statusInput =
      itemForm.querySelector<HTMLInputElement>(
        `input[name="watched"][value="${String(item.watched)}"]`
      );

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

  } else {
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

  window.setTimeout(
    (): void => titleInput.focus(),
    0
  );
}

function closeDialog(): void {
  itemDialog.close();
}

// Validação do formulário

function validateForm(): boolean {
  const title: string =
    titleInput.value.trim();

  const rawYear: string =
    yearInput.value.trim();

  const year: number =
    Number(rawYear);

  let valid: boolean = true;

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

  if (
    rawYear === "" ||
    !Number.isInteger(year) ||
    year < 1888 ||
    year > 2100
  ) {
    yearError.textContent =
      "Informe um ano inteiro entre 1888 e 2100.";

    yearInput.classList.add("invalid");

    valid = false;
  }

  errorSummary.hidden = valid;

  return valid;
}