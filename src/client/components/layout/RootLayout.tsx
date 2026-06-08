import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        {/* O Toaster precisa estar no escopo global */}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}