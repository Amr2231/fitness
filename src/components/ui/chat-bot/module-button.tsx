import { memo } from "react";
import { useTranslations } from "use-intl";
import { cn } from "@/lib/utils/tailwind-merge";
import { Button } from "../button";

type ChatToggleButtonProps = {
  onClick: () => void;
  isOpen: boolean;
  botImage: string;
};

const ChatToggleButton = memo(
  function ChatToggleButton({
    onClick,
    isOpen,
    botImage,
  }: ChatToggleButtonProps) {
    const t = useTranslations("Chat");

    return (
      <div
        className={cn(
          "fixed z-60 bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:bottom-8 sm:right-8 transition-all duration-500 flex flex-col items-center justify-end gap-2 origin-bottom-right",
          isOpen
            ? "scale-0 opacity-0 pointer-events-none"
            : "scale-100 opacity-100"
        )}
      >
        <div className="relative z-10 -mb-2 transition-all duration-500 drop-shadow-[0_10px_30px_var(--color-primary)]">
          <img
            src={botImage}
            alt="Bot"
            className="transition-all duration-500 object-contain w-16 sm:w-24"
          />
        </div>

        <Button
          onClick={onClick}
          className="relative z-20 font-bold px-6 sm:px-10 rounded-full
          transition-all active:scale-95 tracking-wide
          filter drop-shadow-[0_0px_20px_var(--color-primary)]"
        >
          {t("openButton")}
        </Button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isOpen === nextProps.isOpen &&
      prevProps.botImage === nextProps.botImage
    );
  }
);

ChatToggleButton.displayName = "ChatToggleButton";

export default ChatToggleButton;
