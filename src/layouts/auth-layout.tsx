import { Outlet, useParams } from "react-router-dom";
import logo from "@/assets/images/fit.png";
import authLogo from "@/assets/images/auth.png";
import heroBg from "@/assets/images/hero.png";
import LanguageSwitcher from "@/components/layout/navbar/language-switcher";

export default function AuthLayout() {
  const { locale } = useParams();

  return (
    <div
      className="auth-scope relative h-screen w-full overflow-hidden"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Background image + dark blur overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-main/60" />

      {/* Language switcher (login / register / forgot-password) */}
      <div className="absolute top-4 z-20 ltr:right-4 rtl:left-4">
        <LanguageSwitcher />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col">
        {/* Split area */}
        <div className="flex flex-1 w-full min-h-0">
          {/* Left / brand side */}
          <aside className="hidden md:flex w-1/2 flex-col items-center justify-start gap-6 border-e-2 border-primary/20 bg-main/20 px-20 overflow-y-auto">
            <img src={logo} alt="Logo" className="w-60 h-a" />
            <img src={authLogo} alt="Hero" className="w-lg h-auto" />
          </aside>

          {/* Right / form side */}
          <main className="w-full md:w-1/2 flex px-6 sm:px-12 py-10 overflow-y-auto">
            <div className="m-auto w-full flex flex-col items-center">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
