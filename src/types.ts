// 1. Tipos e interfaces

type Category = "Filme" | "Série" | "Documentário" | "Anime";

type StatusFilter = "all" | "watched" | "unwatched";

interface CatalogItem {
  id: string;
  title: string;
  category: Category;
  year: number;
  watched: boolean;
}
