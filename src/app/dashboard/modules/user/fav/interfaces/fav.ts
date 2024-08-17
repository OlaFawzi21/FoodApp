import { RecipeItem } from 'src/app/dashboard/modules/admin/recipe/interfaces/recipe';

export interface Fav {
  pageNumber: number;
  pageSize: number;
  data: FavData[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface FavData {
  id: number;
  recipe: RecipeItem;
}
