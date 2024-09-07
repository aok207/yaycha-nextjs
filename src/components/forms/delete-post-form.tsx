"use client";

import { deletePost } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";

const DeletePostForm = ({ postId }: { postId: string }) => {
  const [state, action] = useFormState(deletePost, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state && state.error) {
      toast({
        title: "Error deleting post",
        description: state.error,
      });
    }

    if (state && !state.error) {
      toast({
        title: "Post deleted successfully",
      });
    }
  }, [state, toast]);

  return (
    <form action={action}>
      <input type="hidden" name="id" value={postId} />
      <button aria-label="Delete Post" type="submit">
        <Trash className="text-red-600 hover:fill-red-600" />
      </button>
    </form>
  );
};

export default DeletePostForm;
