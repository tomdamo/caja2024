import { act, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Caja Boogers" },
    { name: "description", content: "Caja Boogers Portfolio" },
  ];
};

export default function Index() {
  const images = [
    "https://utfs.io/f/eySWb67X0Lyp06tqAKOoFskcentRjDfzZqm5SpiNC1uWL8KO",
    "https://utfs.io/f/eySWb67X0Lypz9OB5oPCaF8RvUCB0tN634gbfqj7HMh1AGle",
    "https://utfs.io/f/eySWb67X0Lyp06tqAKOoFskcentRjDfzZqm5SpiNC1uWL8KO",
    "https://utfs.io/f/eySWb67X0LypP7DfzRvuMfsP9meCikWV7y4zE362LJuwB1Gr",
    "https://utfs.io/f/eySWb67X0LypJaPGauNB2PFycf69kAahM1C3nHv5OS0EGZgU",
    "https://utfs.io/f/eySWb67X0Lyp9YInoDVaARJtPO80QKBriNSybFDG6vcoeqHY",
    "https://utfs.io/f/eySWb67X0Lyp6lq5PtkicNopfLslVa40TIF7YGeuC53mrjAb",
  ];
  const horizontalImages = [
      "https://utfs.io/f/eySWb67X0Lypz93Vr7UCaF8RvUCB0tN634gbfqj7HMh1AGle",
      "https://utfs.io/f/eySWb67X0Lyp5FT5uqR2cnSmpy6Z0zvF1gkUTRWjtPAJq3eL",
      "https://utfs.io/f/eySWb67X0LypBZYYePqLxQ1WI7oSb5K2gjftRFvrwceZp04A",
      "https://utfs.io/f/eySWb67X0LypjhASZh8nw1XaegZqAUHVMdKl8cvCm2I0hzDE",
      "https://utfs.io/f/eySWb67X0LypLA9v38En8VDKUXhIWk07SMraAEjvOGwtLlcC",
      "https://utfs.io/f/eySWb67X0LypMn0rk8SBzOhsCAbi4jtNuIvaeqSkW3cGLVMr",
  ];

  // Bootstrap Carousel Initialization
  useEffect(() => {
    // Import Bootstrap JS
    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
    <img
      src="https://utfs.io/f/eySWb67X0LypH3VN2kbpSQlyWpGw2JPZeaEqmcL1fFsOBC0d"
      alt="Caja Boogers"
      className="w-24 h-24 md:w-32 md:h-32 object-cover self-center mb-1 md:mb-12" 
            />
    <main className="flex-grow container mx-auto py-8 md:py-16">
      {/* Bootstrap Carousel - Main Images */}
      <div id="carouselExampleIndicators" className="carousel slide mb-16 md:mb-32" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {images.map((image, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={image} className="d-block w-screen h-128 md:h-screen object-contain" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div 
      id="carouselHorizontal" 
      className="carousel slide mb-8 md:mb-16" 
      data-bs-ride="carousel"
      data-bs-interval="3000">  
        <div className="carousel-indicators">
          {horizontalImages.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselHorizontal"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {horizontalImages.map((image, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={image} className="d-block w-screen h-96 object-contain" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

    </main>
  </div>
);
}
