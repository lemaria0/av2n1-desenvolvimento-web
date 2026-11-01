
function getVisibleItems(): CatalogItem[] {
  const query: string =
    searchInput.value
      .trim()
      .toLocaleLowerCase("pt-BR");

  const selectedCategory: string =
    categoryFilter.value;

  const selectedStatus: StatusFilter =
    statusFilter.value as StatusFilter;

  return catalog.filter(
    (item: CatalogItem): boolean => {
      const matchesTitle: boolean =
        item.title
          .toLocaleLowerCase("pt-BR")
          .includes(query);

      const matchesCategory: boolean =
        selectedCategory === "all" ||
        item.category === selectedCategory;

      const matchesStatus: boolean =
        selectedStatus === "all" ||
        (
          selectedStatus === "watched" &&
          item.watched
        ) ||
        (
          selectedStatus === "unwatched" &&
          !item.watched
        );

      return (
        matchesTitle &&
        matchesCategory &&
        matchesStatus
      );
    }
  );
}