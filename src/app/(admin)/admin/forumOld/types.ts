// types.ts
export interface ForumItemType {
  id: number;
  name: string;
  description?: string;
  allowTopics?: boolean;
  isPublic?: boolean;
  subForums: ForumItemType[];
}

export interface CategoryType {
  id: number;
  name: string;
  position: number;
  subForums: ForumItemType[];
}
