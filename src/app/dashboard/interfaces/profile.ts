export interface Profile {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  imagePath: any;
  group: { id: number; name: string };
  creationDate: string;
  modificationDate: string;
}