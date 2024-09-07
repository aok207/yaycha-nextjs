import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  const status = useFormStatus();

  return (
    <Button
      variant={"primary"}
      type="submit"
      className={className}
      disabled={status.pending}
    >
      {status.pending ? "Submitting..." : text}
    </Button>
  );
};

export default SubmitButton;
