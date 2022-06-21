import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "ui/components/icon";
import deleteAnimatedIcon from "ui/assets/icons/delete-animated.gif";
import styles from "./panel-header.module.scss";

export const PanelHeader = ({ onDeleteIssue }: PanelHeaderProps): JSX.Element => {
  const [ isDeleting, setIsDeleting ] = useState<boolean>(false);

  const deleteIssue = () => {
    const GIF_LOOP_TIMEOUT = 1180;
    
    setIsDeleting(true);
    setTimeout(() => {
      onDeleteIssue();
      setIsDeleting(false);
    }, GIF_LOOP_TIMEOUT);
  }

  const renderDeleteIcon = (): JSX.Element => {
    const StaticIcon = () => (
      <span style={{ display: isDeleting ? "none" : "flex"}}>
        <Icon name="delete" size={24} />
      </span>
    );

    const AnimatedIcon = () => (
      <img
        src={deleteAnimatedIcon}
        width={24} 
        height={24} 
        style={{ display: isDeleting ? "flex" : "none"}}
      />
    );
    
    return isDeleting
      ? <AnimatedIcon />
      : <StaticIcon />
  }

  return (
    <div className={styles.container}>
      <span className={styles.issue_type}>
        <span className={styles.icon}>
          <Icon name="task" size={16} />
        </span>
        <span className={styles.code}>Issue 1</span>
      </span>
      <button 
        onClick={deleteIssue} 
        className={`${styles.header_button} ${styles.delete_button}`}
      >
        {renderDeleteIcon()}
      </button>
      <Dialog.Close onClick={close} className={styles.header_button}>
        <Icon name="close" size={24} />
      </Dialog.Close>
    </div>
  )
}

interface PanelHeaderProps {
  onDeleteIssue: () => void;
}