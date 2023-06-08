import FeedPostHeader from "./FeedPostHeader";
import FeedPostBody from "./FeedPostBody";
import FeedPostImage from "./FeedPostImage";

interface IPostProps {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: { username: string; id: number };
  description: string;
}

const Post = (props: IPostProps) => {
  const { id, title, content, author, description } = props;

  return (
    <div className="flex flex-col justify-center w-96 rounded-md pb-8 border-b border-gray">
      <FeedPostHeader title={title} author={author} />
      <FeedPostImage id={id} content={content} />
      <FeedPostBody description={description} />
    </div>
  );
};

export default Post;
