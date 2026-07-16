import { useParams, Outlet, Navigate } from "react-router-dom";
import { IntlProvider } from "use-intl";

import enMessages from "../messages/en.json";
import arMessages from "../messages/ar.json";

const messagesMap = {
  en: enMessages,
  ar: arMessages,
};

export default function LocaleLayout() {
  const { locale } = useParams();

  if (!locale || !messagesMap[locale as "en" | "ar"]) {
    return <Navigate to="/en" replace />;
  }

  const currentLocale = locale as "en" | "ar";

  return (
    <IntlProvider locale={currentLocale} messages={messagesMap[currentLocale]}>
      <div
        dir={currentLocale === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-background text-foreground"
      >
        <Outlet />
      </div>
    </IntlProvider>
  );
}
