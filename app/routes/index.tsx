import { ActionArgs } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { Input } from "~/components/input";
import { SubmitButton } from "~/components/submit-button";

const createPostSchema = zfd.formData({
  //  zfd(zod form data) is a helper that helps to parse the form data to an object
  // using the zod schema, if there are multiple values with the same name an array will be returned.
  // it can handle URLSearchParams, FormData, and plain objects
  title: zfd.text(z.string().min(1).max(100)),
  author: zfd.text(z.string().min(1).max(50)),
  content: zfd.text(z.string().min(1).max(1000)),
  published: zfd.checkbox(),
});

export type CreatePostType = z.infer<typeof createPostSchema>;

// remix-validated-form with-zod is a helper that helps to validate form data
// remix-validated-form supported custom validation and other libraries like yup
const createPostValidator = withZod(createPostSchema);

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const validation = await createPostValidator.validate(formData);

  // if there are any errors, return validationError, this is also handled
  // by remix-validated-form
  if (validation.error) {
    return validationError(validation.error);
  }

  // if we make it here, we know that there are no errors so we can
  // get the data from the validation object
  const { title, content, author, published } = validation.data;

  console.log("Creating Post...", { title, content, author, published });
}

export default function () {
  return (
    <div className="flex items-center justify-center">
      {/* Validated form will validate form on both the server side and client side 
      form will not submit to server if there are any errors.*/}
      <ValidatedForm
        validator={createPostValidator}
        className="flex flex-col space-y-4 w-10/12 lg:w-1/2"
        method="post"
      >
        <Input name="title" title="Post Title" />

        <Input name="author" title="Author" />

        <Input name="content" title="Post Content" />

        <div className="flex flex-row items-center">
          <label htmlFor="publish">Publish</label>
          <input
            type="checkbox"
            id="publish"
            name="publish"
            className="ml-2 h-5 w-5"
          />
        </div>

        <div className="w-full flex justify-center items-center">
          <SubmitButton submitText="Create Post" />
        </div>
      </ValidatedForm>
    </div>
  );
}
