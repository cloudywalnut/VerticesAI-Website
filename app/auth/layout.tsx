import { ThemeProvider } from "@/app/home/theme-provider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
