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
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useFormState } from "react-dom";
import { createPostAction } from "@/app/actions";
import { useEffect, useState } from "react";
import SubmitButton from "../shared/submit-button";
import { useToast } from "@/hooks/use-toast";

const CreatePostForm = () => {
  const [state, action] = useFormState(createPostAction, null);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (state && state?.errors.content === undefined) {
      setOpen(false);
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
    }
  }, [state, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} id="open-create-post-btn">
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={action} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Create a new post</DialogTitle>
            <label htmlFor="content">Post</label>
            <Textarea
              name="content"
              id="content"
              placeholder="What's on your thought..."
              aria-required
            ></Textarea>
            {state?.errors.content && (
              <p className="text-red-600 text-sm">{state?.errors.content}</p>
            )}
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Cancel</Button>
            </DialogClose>
            <SubmitButton text="Post" className="mb-2 lg:mb-0" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostForm;
