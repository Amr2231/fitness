import { useParams, Outlet, Navigate } from "react-router-dom";
import { IntlProvider } from "use-intl";
import enMessages from "../messages/en.json";
import arMessages from "../messages/ar.json";
import Navbar from "@/components/layout/navbar";
import ChatBoot from "@/components/layout/chat-bot";
import accountBackground from "@/assets/images/account-background.png";

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
      <div className="relative min-h-screen bg-transparent">
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${accountBackground})`,
          }}
        />

        {/* Blur Overlay - lets the photo's tones show through instead of washing it flat */}
        <div
          className="fixed inset-0 z-0 backdrop-blur-[60px]
    bg-white/25
    dark:bg-[#16171d]/60"
        />

        {/* Brand glow for a bit of character */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 15% 10%, rgba(255,65,0,0.16), transparent 55%), radial-gradient(circle at 85% 90%, rgba(255,65,0,0.12), transparent 50%)",
          }}
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
