export interface Recipe {
  pageNumber: number;
  pageSize: number;
  data: RecipeItem[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface RecipeItem {
  id: number;
  name: string;
  imagePath: any;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: {
    id: number;
    name: string;
  }[];
  tag: {
    id: number;
    name: string;
  };
}
