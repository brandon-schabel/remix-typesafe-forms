import { useIsSubmitting } from "remix-validated-form";

export const SubmitButton = ({
    submitText = "Submit",
  }: {
    submitText?: string;
  }) => {
    const isSubmitting = useIsSubmitting();
  
    return (
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white p-3 rounded-md"
      >
        {isSubmitting ? "Submitting..." : submitText}
      </button>
    );
  };
  
  