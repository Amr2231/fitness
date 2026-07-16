import { useParams, Outlet, Navigate } from "react-router-dom";
import { IntlProvider } from "use-intl";
import enMessages from "../messages/en.json";
import arMessages from "../messages/ar.json";
import Navbar from "@/components/layout/navbar";
import ChatBoot from "@/components/layout/chat-bot";

const messagesMap: Record<string, any> = {
  ar: arMessages,
  en: enMessages,
};

export default function AccountLayout() {
  const { locale } = useParams();

  if (!locale || !messagesMap[locale]) {
    return <Navigate to="/en" replace />;
  }

  return (
    <IntlProvider messages={messagesMap[locale]} locale={locale}>
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/images/account-background.png')",
          }}
        />

        {/* Blur Overlay */}
        <div
          className="absolute inset-0  backdrop-blur-[86px]
    bg-[#FFFFFF99]
    dark:bg-[#24242499]"
        />

        {/* Content */}
        <header className="relative z-50 ">
          <Navbar account={true} />
        </header>

        <main
          className="relative z-10 min-h-screen w-full text-foreground bg-transparent"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <ChatBoot />
          <Outlet />
        </main>
      </div>
    </IntlProvider>
  );
}
