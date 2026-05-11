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
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl font-black text-primary">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">No encontramos esa página</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Quizá te interese explorar todos los materiales disponibles.
        </p>
        <Link
          to="/materiales"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Ir al hub de materiales
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold">Algo se ha torcido</h1>
        <p className="mt-2 text-sm text-muted-foreground">Prueba a recargar o vuelve al inicio.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Reintentar
          </button>
          <Link
            to="/"
            className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "11F · Hub Materiales" },
      {
        name: "description",
        content:
          "Hub abierto con +60 recursos para celebrar el 11F: presentaciones, vídeos, juegos, ilustraciones y más, con filtros por etapa, idioma y tipo.",
      },
      { property: "og:title", content: "11F · Hub Materiales" },
      {
        property: "og:description",
        content: "Encuentra en segundos el material perfecto para tu aula del Día Internacional de la Mujer y la Niña en la Ciencia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "11F · Hub Materiales" },
      { name: "description", content: "11F Materials Hub is a unified platform for educational resources with real-time filtering." },
      { property: "og:description", content: "11F Materials Hub is a unified platform for educational resources with real-time filtering." },
      { name: "twitter:description", content: "11F Materials Hub is a unified platform for educational resources with real-time filtering." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69ce296f-2211-4feb-a738-6164a6d50a69/id-preview-f5e81a2b--caf178c3-007d-4e37-a1f5-eaada1ebc9e7.lovable.app-1778512579269.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69ce296f-2211-4feb-a738-6164a6d50a69/id-preview-f5e81a2b--caf178c3-007d-4e37-a1f5-eaada1ebc9e7.lovable.app-1778512579269.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
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
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
