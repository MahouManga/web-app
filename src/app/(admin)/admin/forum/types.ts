// types.ts
export interface Forum {
  id: number;
  title: string;
  description: string;
  allowTopics: boolean;
  isPublic: boolean;
  categoryId?: string;
  parentForumId?: number;
  subForums: Forum[];
  createdAt: string;
  updatedAt: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  position: number;
  forums: Forum[];
}