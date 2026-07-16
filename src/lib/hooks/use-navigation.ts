import { useNavigate, useParams } from "react-router-dom";

export function useLocaleNavigation() {
  const { locale } = useParams();
  const navigate = useNavigate();

  const localizePath = (path: string) => {
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `/${locale}/${cleanPath}`;
  };

  const localeNavigate = (path: string, options?: any) => {
    navigate(localizePath(path), options);
  };

  return { localeNavigate, localizePath, currentLocale: locale };
}
