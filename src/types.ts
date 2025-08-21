export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  photo: File | null;
  date: string;
  hour: string;
}

export interface Holidays {
  country: string;
  iso: string;
  year: number;
  date: string;
  day: string;
  name: string;
  type: string;
}
