export interface Users {
  pageNumber: number;
  pageSize: number;
  data: user[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}


export interface user {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: any;
  creationDate: string;
  modificationDate: string;
  group: {
    id: number;
    name: string;
  };
}
