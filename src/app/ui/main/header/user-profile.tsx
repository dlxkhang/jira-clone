import { useState } from "react";
import { Form } from "@remix-run/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classix";
import { useUserStore } from "@app/store/user.store";
import { Icon } from "@app/components/icon";
import { UserAvatar } from "@app/components/user-avatar";

export const UserProfile = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserStore();

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <DropdownMenu.Root open={isOpen}>
      <DropdownMenu.Trigger
        onClick={openMenu}
        className="ml-4 rounded-full outline outline-2 outline-grey-300 hover:outline-primary-main dark:outline-grey-600 dark:hover:outline-white"
      >
        <UserAvatar {...user} tooltip={false} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          onEscapeKeyDown={closeMenu}
          onPointerDownOutside={closeMenu}
          align="end"
          sideOffset={5}
          className={cx(
            "z-50 rounded bg-white shadow-md-dark dark:bg-dark-400",
            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down"
          )}
        >
          <DropdownMenu.Item className="flex flex-col items-center p-3 !outline-none">
            <UserAvatar {...user} size={80} tooltip={false} />
            <span className="mt-2 text-lg">{user.name}</span>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-px bg-grey-500 dark:bg-dark-100" />
          <DropdownMenu.Item className="select-none p-1 !outline-none">
            <Form
              action="action/logout"
              method="post"
              // onClick={(e) => e.preventDefault()}
            >
              <button
                type="submit"
                // onClick={(e) => e.preventDefault()}
                className="flex w-full items-center gap-2 rounded p-2 text-xs text-error-main hover:bg-error-light dark:text-error-main-dark dark:hover:bg-dark-100"
              >
                <Icon name="clock" size={20} />
                <span className="">Log out</span>
              </button>
            </Form>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};