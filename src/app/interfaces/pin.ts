export interface Pin {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  analytics: {
    views: number;
    saves: number;
  };
  url?: string;
}
