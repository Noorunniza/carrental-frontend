import "./globals.css";

export const metadata = {
  title: "Car Rental",
  description: "Search cars easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
