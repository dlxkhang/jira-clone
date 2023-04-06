import { v4 as uuid } from "uuid";
import { Comment } from "@domain/comment";
import { useUserStore } from "@app/store/user.store";
import { UserAvatar } from "@app/components/user-avatar";
import { EditBox } from "./edit-box";
import { Prisma } from "@prisma/client";

export const CreateComment = ({
  addComment,
}: CreateCommentProps): JSX.Element => {
  const { user } = useUserStore();

  const save = (message: string) => {
    addComment({
      message,
      createdAt: Date(),
      updatedAt: Date(),
      // TODO: Add issue and user
      issue: {
        create: undefined,
        connectOrCreate: undefined,
        connect: undefined
      },
      user: {
        create: undefined,
        connectOrCreate: undefined,
        connect: undefined
      }
    });
  };

  return (
    <div className="mt-4 flex items-start gap-6">
      <UserAvatar {...user} />
      <EditBox defaultMessage="" save={save} />
    </div>
  );
};

 interface CreateCommentProps {
  addComment: (comment: Prisma.CommentCreateInput) => void;
}

export interface TempComment extends Omit<Comment, "id"> {
  id: string;
}