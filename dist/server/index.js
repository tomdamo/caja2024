import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
  { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" }
  // Bootstrap CSS
];
function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return /* @__PURE__ */ jsx("nav", { className: "bg-white text-gray-600 p-4", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex justify-between items-center", children: [
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-2xl font-bold flex items-center", children: !isHomePage && /* @__PURE__ */ jsx(
      "img",
      {
        src: "https://utfs.io/f/eySWb67X0LypH3VN2kbpSQlyWpGw2JPZeaEqmcL1fFsOBC0d",
        alt: "Caja Boogers",
        className: "w-20 h-10 mr-2 object-cover"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx("a", { href: "/work", className: "hover:underline", children: "Work" }),
      /* @__PURE__ */ jsx("a", { href: "/cv", className: "hover:underline", children: "CV" }),
      /* @__PURE__ */ jsx("a", { href: "/contact", className: "hover:underline", children: "Contact" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://instagram.com/cajaboogers",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center space-x-1 hover:underline",
          children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-instagram", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" }) })
        }
      )
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-white text-gray-500 text-center p-4 mt-8", children: /* @__PURE__ */ jsxs("p", { children: [
    "© ",
    (/* @__PURE__ */ new Date()).getFullYear(),
    " Caja Boogers. website by",
    " ",
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://daamn.nl",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "underline",
        children: "daamn.nl"
      }
    )
  ] }) });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "font-sans antialiased", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto py-8", children }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Contact() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-16 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8", children: "Contact" }),
    /* @__PURE__ */ jsxs("p", { children: [
      " Send me an email:",
      /* @__PURE__ */ jsx("a", { href: "contact@cajaboogers.com", className: "text-black underline mt-4 inline-block", children: "contact@cajaboogers.com" })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Message me on Instagram:",
      /* @__PURE__ */ jsx("a", { href: "https://instagram.com/cajaboogers", className: "text-black underline mt-4 inline-block", children: "@cajaboogers" })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contact
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "Caja Boogers" },
    { description: "Caja Boogers (Vlaardingen, 2001) offical website.", content: "Caja Boogers Art Portfolio" }
  ];
};
function Index() {
  const images2 = [
    "https://utfs.io/f/eySWb67X0Lyp06tqAKOoFskcentRjDfzZqm5SpiNC1uWL8KO",
    "https://utfs.io/f/eySWb67X0Lypz9OB5oPCaF8RvUCB0tN634gbfqj7HMh1AGle",
    "https://utfs.io/f/eySWb67X0Lyp06tqAKOoFskcentRjDfzZqm5SpiNC1uWL8KO",
    "https://utfs.io/f/eySWb67X0LypP7DfzRvuMfsP9meCikWV7y4zE362LJuwB1Gr",
    "https://utfs.io/f/eySWb67X0LypJaPGauNB2PFycf69kAahM1C3nHv5OS0EGZgU",
    "https://utfs.io/f/eySWb67X0Lyp9YInoDVaARJtPO80QKBriNSybFDG6vcoeqHY",
    "https://utfs.io/f/eySWb67X0Lyp6lq5PtkicNopfLslVa40TIF7YGeuC53mrjAb"
  ];
  const horizontalImages = [
    "https://utfs.io/f/eySWb67X0Lypz93Vr7UCaF8RvUCB0tN634gbfqj7HMh1AGle",
    "https://utfs.io/f/eySWb67X0Lyp5FT5uqR2cnSmpy6Z0zvF1gkUTRWjtPAJq3eL",
    "https://utfs.io/f/eySWb67X0LypBZYYePqLxQ1WI7oSb5K2gjftRFvrwceZp04A",
    "https://utfs.io/f/eySWb67X0LypjhASZh8nw1XaegZqAUHVMdKl8cvCm2I0hzDE",
    "https://utfs.io/f/eySWb67X0LypLA9v38En8VDKUXhIWk07SMraAEjvOGwtLlcC",
    "https://utfs.io/f/eySWb67X0LypMn0rk8SBzOhsCAbi4jtNuIvaeqSkW3cGLVMr"
  ];
  useEffect(() => {
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);
    bootstrapScript.onload = () => {
      const carouselElements = document.querySelectorAll(".carousel");
      carouselElements.forEach((carousel) => {
        new window.bootstrap.Carousel(carousel, {
          interval: 3e3,
          // Slide every 3 seconds
          ride: "carousel"
        });
      });
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: "https://utfs.io/f/eySWb67X0LypH3VN2kbpSQlyWpGw2JPZeaEqmcL1fFsOBC0d",
        alt: "Caja Boogers",
        className: "w-24 h-24 md:w-32 md:h-32 object-cover self-center mb-1 md:mb-12"
      }
    ),
    /* @__PURE__ */ jsx("h1", { className: "sr-only", children: "Caja Boogers - Artist Portfolio" }),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow container mx-auto py-8 md:py-16", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          id: "carouselExampleIndicators",
          className: "carousel slide mb-16 md:mb-32",
          "data-bs-ride": "carousel",
          "data-bs-interval": "3000",
          children: [
            /* @__PURE__ */ jsx("div", { className: "carousel-indicators", children: images2.map((_, index) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "data-bs-target": "#carouselExampleIndicators",
                "data-bs-slide-to": index,
                className: index === 0 ? "active" : "",
                "aria-current": index === 0 ? "true" : "false",
                "aria-label": `Slide ${index + 1}`
              },
              index
            )) }),
            /* @__PURE__ */ jsx("div", { className: "carousel-inner", children: images2.map((image, index) => /* @__PURE__ */ jsx("div", { className: `carousel-item ${index === 0 ? "active" : ""}`, children: /* @__PURE__ */ jsx(
              "img",
              {
                src: image,
                className: "d-block w-screen h-128 md:h-screen object-contain",
                alt: `Slide ${index + 1}`,
                loading: "eager"
              }
            ) }, index)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          id: "carouselHorizontal",
          className: "carousel slide mb-8 md:mb-16",
          "data-bs-ride": "carousel",
          "data-bs-interval": "3000",
          children: [
            /* @__PURE__ */ jsx("div", { className: "carousel-indicators", children: horizontalImages.map((_, index) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "data-bs-target": "#carouselHorizontal",
                "data-bs-slide-to": index,
                className: index === 0 ? "active" : "",
                "aria-current": index === 0 ? "true" : "false",
                "aria-label": `Slide ${index + 1}`
              },
              index
            )) }),
            /* @__PURE__ */ jsx("div", { className: "carousel-inner", children: horizontalImages.map((image, index) => /* @__PURE__ */ jsx("div", { className: `carousel-item ${index === 0 ? "active" : ""}`, children: /* @__PURE__ */ jsx(
              "img",
              {
                src: image,
                className: "d-block w-screen h-96 object-contain",
                alt: `Slide ${index + 1}`,
                loading: "eager"
              }
            ) }, index)) })
          ]
        }
      )
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const images = [
  {
    name: "img1.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypawLrPf46JE7GOrycKQZugpfYvhP1lTxdCNwD",
    caption: "Retelling \n50 paintings \noil and paste on linen  \n113x170cm (total) \n 2024"
  },
  {
    name: "img2.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lypz8yt3BCaF8RvUCB0tN634gbfqj7HMh1AGlex",
    caption: "Partition \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "img3.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lyp6GRjPhkicNopfLslVa40TIF7YGeuC53mrjAb",
    caption: "Plain #10  \n  oil and paste om linen \n 180x130cm \n 2023"
  },
  {
    name: "img4.jpeg",
    url: "https://utfs.io/f/eySWb67X0LyppBvWIw3QGO9byLSIco7x01Mhq42gB8dAWHFt",
    caption: "Partition \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "img5.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lyppif6t3QGO9byLSIco7x01Mhq42gB8dAWHFtv",
    caption: "Partition #2 \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "img6.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypXvexFA98rxUQbyG5SIKEjtvlue3LsoFaAVg7",
    caption: "Untitled (partition) #5  \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "img7.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lypj2k5TOk8nw1XaegZqAUHVMdKl8cvCm2I0hzD",
    caption: "Untitled (partition) #3 \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "img8.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypIFNJiuUmDl5xLJXVEdsPY7nCequg4AfiThHy",
    caption: "Partition #3 \n oil and paste on linen \n 200x120cm \n 2023 \n photography by Django van Ardenne"
  },
  {
    name: "img9.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypXL6ecA98rxUQbyG5SIKEjtvlue3LsoFaAVg7",
    caption: "Partition #7 \n oil and paste on linen \n 200x120cm \n 2023"
  },
  {
    name: "public.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypieWgMLy5aTRAEuq2SwzKC3cUnWH4vDkx9hm0/f/eySWb67X0Lyp7wM0cuo9qJo3RjhHGlD56kBLM4VXZcytWOCg",
    caption: "The Plain \n oil and paste on linen\n 200x480cm \n 2023"
  },
  {
    name: "img11.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypypgHjOxNzB2o8gXUunE9ewIfmHb4RTVax7YA",
    caption: "Plain \n oil and paste on linen\n 180x130cm \n 2023"
  },
  {
    name: "img12.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lyp4kUuIhQYhe8gJUBFPw5GRr6MTpWu1zAbSsl0",
    caption: "Untitled (partition) \n oil and paste on linen \n 160x120cm \n 2023"
  }
];
function Work() {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const modalRef = useRef(null);
  useEffect(() => {
    if (fullscreenImage && modalRef.current) {
      modalRef.current.focus();
    }
  }, [fullscreenImage]);
  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      setFullscreenImage(null);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-16", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8 text-center hidden", children: "Artwork" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: images.map((image, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "relative cursor-pointer",
        role: "button",
        tabIndex: 0,
        onClick: () => setFullscreenImage({ url: image.url, caption: image.caption }),
        onKeyDown: (e) => e.key === "Enter" && setFullscreenImage({ url: image.url, caption: image.caption }),
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: image.url,
            alt: `Artwork ${index + 1}`,
            className: "w-full h-auto object-cover"
          }
        )
      },
      index
    )) }),
    fullscreenImage && /* @__PURE__ */ jsx(
      "div",
      {
        ref: modalRef,
        className: "fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center",
        role: "dialog",
        "aria-modal": "true",
        tabIndex: -1,
        onKeyDown: handleKeyPress,
        onClick: () => setFullscreenImage(null),
        children: /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center justify-center w-full h-full", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: fullscreenImage.url,
              alt: "Fullscreen artwork",
              className: "w-auto max-w-[90vw] max-h-[90vh] object-contain md:max-w-[70vw] md:max-h-[70vh] "
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-5 left-5 text-white text-sm sm:text-base md:text-lg", children: fullscreenImage.caption.split("\n").map((line, index) => /* @__PURE__ */ jsx("p", { children: line }, index)) })
        ] })
      }
    )
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Work
}, Symbol.toStringTag, { value: "Module" }));
function CV() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-16", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8 text-center", children: "CV" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-2/3", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Exhibition" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2024" }),
              " - Daily encounters and how to catch them, Museum Helmond, Helmond, groupshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2024" }),
              " - ECHTER, Moving Gallery, Utrecht, groupshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2024" }),
              " - Art Rotterdam, Best of Graduates Legacy, Galerie Ron Mandos, groupshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2024" }),
              " - Art Rotterdam, Represented by Galerie Gerhard Hofland, Rotterdam, groupshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2023" }),
              " - Closing Distance, Galerie Weisbard, Rotterdam, solo-show"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2023" }),
              " - Maidentrip, Collectie de Groen, Arnhem, solo-show"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2023" }),
              " - Best of Graduates, Galerie Ron Mandos, Amsterdam, groupshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2023" }),
              " - HKU Exposure, HKU Fine Art, Utrecht, graduation show"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2023" }),
              " - PARTITIONS, Galerie Gerhard Hofland, Amsterdam, duoshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2023" }),
              " - TRAILER, AG, Utrecht, groupshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2023" }),
              " - A Touch of Light, Museum Kranenburgh, Bergen, groupshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2022" }),
              " - PEEK Pastoe, HKU Fine Art, Utrecht, groupshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2022" }),
              " - The NEXT: KapSalon, Herman van Veen Arts Center, Soest, groupshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2021" }),
              " - CURRENT CURRENT CURRENT, OMSTAND, Arnhem, groupshow"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2021" }),
              " - Virtual Empathy, AG, Utrecht, groupshow"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Education" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2019-2023" }),
              " - BA Fine Art, Hogeschool voor de Kunsten Utrecht"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2022" }),
              " - Internship Pennie Key, Rijksakademie"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Residencies" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2023" }),
            " - Lakeside Collection Award, Artist-in-residence, Depot Boijmans Van Beuningen, Rotterdam"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Publications" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "10 juli 2023" }),
              " - ‘De vliegende start van drie jonge kunstenaars’ by Anna van Leeuwen, de Volkskrant"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2023" }),
              " - Metropolis M: Inkomen & Eindexamens by Eli Witteman"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "18 juni 2023" }),
              " - Nu te Zien: A touch of light, AVROTROS"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "30 november 2023" }),
              " - MuseumTV: Kunstbeloften: Caja Boogers"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Extra" }),
          /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Works have been acquired by collections such as:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside", children: [
            /* @__PURE__ */ jsx("li", { children: "Museum Voorlinden" }),
            /* @__PURE__ */ jsx("li", { children: "Akzo Nobel Art Foundation" }),
            /* @__PURE__ */ jsx("li", { children: "Lakeside Collection" }),
            /* @__PURE__ */ jsx("li", { children: "Ministerie van Binnenlandse Zaken" }),
            /* @__PURE__ */ jsx("li", { children: "ING Collection" }),
            /* @__PURE__ */ jsx("li", { children: "Verder Collectie" }),
            /* @__PURE__ */ jsx("li", { children: "Collectie de Groen" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:w-1/3 lg:pl-8 mt-8 lg:mt-0", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://utfs.io/f/eySWb67X0LypKwFSdsVSNOs8z3nexXov4D2rtG6Hqa5MpAc1",
          alt: "Artwork of Caja Boogers",
          className: "w-full h-auto object-cover"
        }
      ) })
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CV
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CJ_MXSic.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-Ciyp1X6x.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DNi-1SJ_.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-Ciyp1X6x.js"], "css": ["/assets/root-qUqZ5_T3.css"] }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/contact-Cvs1kbOj.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DlOf47WE.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/work": { "id": "routes/work", "parentId": "root", "path": "work", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/work-DcGsgX6V.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/cv": { "id": "routes/cv", "parentId": "root", "path": "cv", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/cv-BvoJnOZ3.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] } }, "url": "/assets/manifest-abf41084.js", "version": "abf41084" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/work": {
    id: "routes/work",
    parentId: "root",
    path: "work",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/cv": {
    id: "routes/cv",
    parentId: "root",
    path: "cv",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
