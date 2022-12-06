import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { User, UserId } from "@domain/user";
import { useProjectStore } from "@app/ui/main/project";
import { UserAvatar } from "@app/components/avatar";
import {
  SelectTrigger,
  SelectTriggerIcon,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
} from "@app/components/select";

export const SelectAsignee = ({ initAsignee }: Props): JSX.Element => {
  const projectStore = useProjectStore();
  const users = projectStore.project.users;

  const [selectedValue, setSelectedValue] = useState<User>(initAsignee);

  const onValueChange = (userId: UserId) => {
    const asignee = projectStore.project.users.find(
      (user) => user.id === userId
    );

    if (asignee) {
      setSelectedValue(asignee);
    }
  };

  return (
    <Select.Root
      name="asignee"
      defaultValue={initAsignee.id}
      onValueChange={onValueChange}
    >
      <SelectTrigger>
        <div className="mr-2">
          <UserAvatar {...selectedValue} tooltip={false} size={32} />
        </div>
        <Select.Value />
        <SelectTriggerIcon />
      </SelectTrigger>
      <SelectContent>
        <Select.ScrollUpButton />
        <Select.Viewport>
          {users.map((user, index) => (
            <SelectItem key={index} value={user.id}>
              <SelectItemIndicator />
              <UserAvatar {...user} tooltip={false} />
              <Select.ItemText>{user.name}</Select.ItemText>
            </SelectItem>
          ))}
          <Select.Separator />
        </Select.Viewport>
        <Select.ScrollDownButton />
      </SelectContent>
    </Select.Root>
  );
};

interface Props {
  initAsignee: User;
}