export interface IActivity {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
}

export interface ISimplifiedActivity {
  name: string;
  participants: number;
  budget: string;
}
