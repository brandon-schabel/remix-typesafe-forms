import { CreatePostType } from "~/routes";

export const createPost = ({
  author,
  content,
  published,
  title,
}: CreatePostType) => {
  // this is to demonstrate how you can use Zod infer to create the create the input parameters to a function
  // normally here you might insert into your database
  console.log({
    author,
    content,
    published,
    title,
  });
};
