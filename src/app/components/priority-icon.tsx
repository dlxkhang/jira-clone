import cx from "classix";
import { HiFlag } from "react-icons/hi";
import { PriorityStatus } from "@domain/priority";

export const PriorityIcon = ({
  priority,
  size = 18,
}: PriorityIconProps): JSX.Element => (
  <span
    className={cx(
      "flex",
      priority === "low" && "text-success-main",
      priority === "medium" && "text-warn-main",
      priority === "high" && "text-error-main"
    )}
  >
    <HiFlag size={size} />
  </span>
);

interface PriorityIconProps {
  priority: PriorityStatus;
  size?: number;
}
