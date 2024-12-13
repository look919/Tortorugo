export type NewPostCategory =
  | {
      type: 'new';
      fieldId: number;
      name: string;
      filterable: boolean;
      color: string;
    }
  | {
      type: 'existing';
      fieldId: number;
      id: string;
    };

export type FormPost = {
  title: string;
  content: string;
  authorId: string;
  referencesCount: number;
  newPostCategories?: NewPostCategory[];
  isPrivate: boolean;
  postId?: string;
};
