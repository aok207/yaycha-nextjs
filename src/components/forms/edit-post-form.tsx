"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useFormState } from "react-dom";
import { editPostAction } from "@/app/actions";
import { useEffect, useState } from "react";
import SubmitButton from "../shared/submit-button";
import { useToast } from "@/hooks/use-toast";

const EditPostForm = ({ id, content }: { id: string; content: string }) => {
  const [state, action] = useFormState(editPostAction, null);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (state && state?.errors.content === undefined) {
      setOpen(false);
      toast({
        title: "Success",
        description: "Post edited successfully!",
      });
    }
  }, [state, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button aria-label="Edit Post">
          <Edit className="text-purple-700 hover:text-purple-500" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <form action={action} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <input type="hidden" name="id" value={id} />

            <label htmlFor="content">Post</label>
            <Textarea
              name="content"
              id="content"
              placeholder="What's on your thought..."
              aria-required
              defaultValue={content}
            ></Textarea>
            {state?.errors.content && (
              <p className="text-red-600 text-sm">{state?.errors.content}</p>
            )}
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Cancel</Button>
            </DialogClose>
            <SubmitButton text="Edit" className="mb-3 lg:mb-0" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostForm;
