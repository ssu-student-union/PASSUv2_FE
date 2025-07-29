export interface Event {
  id: number;
  name: string;
  place: string;
  date: string;
  time: string;
}

export interface FormValues {
  title: string;
  location: string;
  date: string;
  time: string;
  product: string;
  quantity: number;
  participants: string[];
  feeStatus: string[];
  description: string;
}
