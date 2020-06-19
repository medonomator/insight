export interface IAphorisms {
  id: string;
  authorName: string;
  authorMachineName: string;
  body: string;
  category: string;
  created_at?: string;
  updated_at?: string;
  tags: Array<{
    name: string;
    machineName: string;
  }>;
}
