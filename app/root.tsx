import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "./tailwind.css";

// Add any custom fonts or stylesheets here
// In your root layout component
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
  { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" }, // Bootstrap CSS
];


// Navigation Bar Component
function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="bg-white text-black p-4">
    <div className="container mx-auto flex justify-between items-center">
      <a href="/" className="text-2xl font-bold flex items-center">
        {!isHomePage && (
          <img
            src="https://utfs.io/f/eySWb67X0LypH3VN2kbpSQlyWpGw2JPZeaEqmcL1fFsOBC0d"
            alt="Caja Boogers"
            className="w-20 h-10 mr-2 object-cover"
          />
        )}
      </a>
      <div className="space-x-4">
        <a href="/work" className="hover:underline">
          Work
        </a>
        <a href="/cv" className="hover:underline">
          CV
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
        <a
          href="https://instagram.com/cajaboogers"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Instagram
        </a>
      </div>
    </div>
  </nav>
);
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-white text-black text-center p-4 mt-8">
      <p>
        © {new Date().getFullYear()} Caja Boogers.
        website by{" "}
        <a
          href="https://daamn.nl"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          daamn.nl
        </a>
      </p>
    </footer>
  );
}

// Layout component wrapping the whole application
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <div className="container mx-auto py-8">{children}</div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Main App component, rendering the Layout and Outlet for the pages
export default function App() {
  return (
      <Outlet />
  );
}
