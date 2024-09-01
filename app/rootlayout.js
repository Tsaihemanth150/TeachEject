// RootLayout.js
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      {children}
    </ThemeProvider>
  );
}
