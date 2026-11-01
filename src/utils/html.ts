// Segurança na exibição de textos

function escapeHTML(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character: string): string => {
      const entities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      };

      return entities[character] ?? character;
    }
  );
}