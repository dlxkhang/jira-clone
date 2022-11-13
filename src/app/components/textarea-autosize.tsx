import { useEffect, useState, useRef } from "react";
import cx from "classix";

export const TextareaAutosize = (props: TitleProps): JSX.Element => {
  const {
    value,
    setValue,
    placeholder,
    autofocus,
    textareaClassName,
    onFocus,
    onBlur,
  } = props;

  const [textareaHeight, setTextareaHeight] = useState<number>(40);
  const textareaRef = useRef<HTMLParagraphElement>(null);

  const handleOnFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const length = target.value.length;
    // Place cursor at the end of the current text
    target.setSelectionRange(length, length);
    if (onFocus) onFocus();
  };

  const handleTitleChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  const valueIsNotOnlySpaces = (): boolean => {
    return !/^( )\1*$/.test(value);
  };

  useEffect(() => {
    if (!textareaRef.current) return;

    setTextareaHeight(textareaRef.current.scrollHeight);
  }, [value]);

  return (
    <div className="relative">
      <textarea
        className={cx(
          "box-border w-full resize-none overflow-y-hidden rounded-md border-none p-3 text-font-main outline-2 hover:bg-grey-300 focus:bg-white focus:outline-2 focus:outline-primary-main",
          textareaClassName
        )}
        value={value}
        onChange={handleTitleChange}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={onBlur}
        style={{ height: `${textareaHeight}px` }}
        autoFocus={autofocus}
      />
      <p
        ref={textareaRef}
        className={cx(
          "absolute top-0 left-0 -z-10 box-border overflow-y-hidden p-3 opacity-0",
          textareaClassName
        )}
      >
        {(valueIsNotOnlySpaces() && value) || placeholder}
      </p>
    </div>
  );
};

interface TitleProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  autofocus?: boolean;
  textareaClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}