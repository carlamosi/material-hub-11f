import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useGlobalShortcuts } from "@/hooks/use-shortcuts";

function NotFoundComponent() {
  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-4 py-20">
      <p className="kicker">Error 404</p>
      <h1 className="mt-3 font-serif text-6xl font-medium leading-none">No encontramos esa página.</h1>
      <p className="mt-5 text-lg text-muted-foreground prose-ed">
        Quizá te interese explorar el índice completo de materiales del 11F.
      </p>
      <Link
        to="/materiales"
        className="mt-8 inline-flex w-fit items-center gap-2 bg-ink px-5 py-2.5 text-sm font-medium text-paper"
      >
        Ir al índice de materiales →
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-4 py-20">
      <p className="kicker">Algo se ha torcido</p>
      <h1 className="mt-3 font-serif text-5xl font-medium leading-none">Errata involuntaria</h1>
      <p className="mt-5 text-muted-foreground">{error.message}</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Reintentar
        </button>
        <Link to="/" className="border border-ink/20 px-4 py-2 text-sm font-medium hover:border-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Once·F — Materiales del 11 de febrero, en una sola edición" },
      {
        name: "description",
        content:
          "Hub editorial de recursos verificados para el Día Internacional de la Mujer y la Niña en la Ciencia: presentaciones, juegos, vídeos, ilustraciones y un recomendador que monta tu sesión.",
      },
      { property: "og:title", content: "Once·F — La edición especial del 11F para tu aula" },
      {
        property: "og:description",
        content: "Recursos curados, enlaces verificados y un recomendador que diseña tu secuencia didáctica.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..600,30..100&family=Inter+Tight:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ShortcutsBridge />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}

function ShortcutsBridge() {
  useGlobalShortcuts();
  return null;
}
