import './globals.css';
import { AppConfig } from "@/config/app-config";
import { NextIntlClientProvider } from "next-intl";
import { QueryProvider } from '@/core/provider/QueryProvider';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/custom/Header';
import AuthSessionProvider from '@/components/providers/SessionProvider';

export async function generateStaticParams() {
  return AppConfig.locales.map((lang: string) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthSessionProvider>
              <NextIntlClientProvider
                locale={lang}
                messages={(await import(`../../shared/locale/${lang}.json`)).default}
              >
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    {children}
                  </main>
                  <footer className="border-t py-6 md:py-0">
                    <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                      <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built with Next.js 15 and shadcn/ui
                      </p>
                    </div>
                  </footer>
                </div>
              </NextIntlClientProvider>
            </AuthSessionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}