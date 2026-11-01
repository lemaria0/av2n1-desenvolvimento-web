
function getArtClass(category: Category): string {
  const artClasses: Record<Category, string> = {
    "Filme": "art-film",
    "Série": "art-series",
    "Documentário": "art-documentary",
    "Anime": "art-anime"
  };

  return artClasses[category];
}

function getCategoryLabel(
  category: Category
): string {
  return category === "Documentário"
    ? "DOC"
    : category.toLocaleUpperCase("pt-BR");
}

function getInitial(title: string): string {
  const trimmed: string = title.trim();

  return escapeHTML(
    trimmed.length > 0
      ? trimmed.charAt(0).toLocaleUpperCase("pt-BR")
      : "?"
  );
}