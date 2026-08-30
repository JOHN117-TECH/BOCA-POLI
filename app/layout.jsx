import "./globals.css";

export const metadata = {
  title: "BOCA | Entrega 2 Semana 5",
  description: "Primera versión de la mejora de interfaz para BOCA."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
