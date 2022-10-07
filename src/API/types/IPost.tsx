export default interface IPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: { username: string; id: number };
  description: string;
}
