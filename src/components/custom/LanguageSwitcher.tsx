"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppConfig, Localizations } from "@/config/app-config";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLanguage = (locale: string) => {
    router.push(`/${locale}${pathname.replace(/^\/(en|fr|es)/, "")}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {
            Localizations.supportedLocales[
              currentLocale as keyof typeof Localizations.supportedLocales
            ]
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {AppConfig.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => changeLanguage(locale)}
            className={locale === currentLocale ? "bg-accent" : ""}
            disabled={locale === currentLocale}
          >
            {
              Localizations.supportedLocales[
                locale as keyof typeof Localizations.supportedLocales
              ]
            }
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
