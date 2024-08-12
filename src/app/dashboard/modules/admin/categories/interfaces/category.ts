export interface Category {
  data: Record[];
  pageNumber: number;
  pageSize: number;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}

interface Record {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}