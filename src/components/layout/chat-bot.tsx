import { Button } from "@/components/ui/button";
import emo from "@/assets/images/emo.png";
import { useTranslations } from "use-intl";

export default function ChatBoot() {
  //Translations
  const t = useTranslations("chat-boot");

  return (
    <>
      {/* chat bot */}
      <div className="fixed right-10 bottom-10 z-50 ">
        <img src={emo} alt="img-button" className="h-24 mx-auto" />
        <Button variant="default" className="w-32 p-1.5">
          {t("title")}
        </Button>
      </div>
    </>
  );
}
