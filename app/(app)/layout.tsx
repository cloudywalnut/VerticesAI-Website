import { ThemeProvider } from "@/app/home/theme-provider";
import AppNav from "./app-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppNav />
      <div className="pt-20 min-h-screen bg-canvas">{children}</div>
    </ThemeProvider>
  );
}
