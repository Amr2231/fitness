import { useCallback, memo } from "react";
import { Send, PenLine } from "lucide-react";
import { Input } from "../input";

type ChatInputProps = {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
};

const ChatInput = memo(
  function ChatInput({
    value,
    onChange,
    onSend,
    disabled,
    placeholder = "Ask Me Anything",
    ref,
  }: ChatInputProps) {
    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim() && !disabled) {
          onSend();
        }
      },
      [value, disabled, onSend],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange],
    );

    return (
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="relative flex overflow-hidden focus-within:border-primary/50 transition-colors"
        >
          <Input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            dir="auto"
            icon={<PenLine size={14} className="ms-4 text-primary rtl:me-4"  />}
            className="bg-transparent border-none text-white text-sm px-3 py-4 outline-none placeholder:text-white/40 placeholder:text-start text-start transition-all duration-700"
          />

          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="pe-4 text-primary hover:text-primary/50 disabled:hidden transition-colors cursor-pointer"
          >
            <Send size={20} className="rtl:rotate-y-180" />
          </button>
        </form>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.placeholder === nextProps.placeholder
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
