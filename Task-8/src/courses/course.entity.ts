export interface Course {
  id: string;
  title: string;
  description: string;
  image?: string | undefined;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}
