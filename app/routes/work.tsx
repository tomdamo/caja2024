import { useEffect, useRef, useState } from "react";

const images = [
  {
    name: "img9.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypXL6ecA98rxUQbyG5SIKEjtvlue3LsoFaAVg7",
    caption: "Caption 1",
  },
  {
    name: "img8.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypIFNJiuUmDl5xLJXVEdsPY7nCequg4AfiThHy",
    caption: "Caption 2",
  },
  {
    name: "img7.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lypj2k5TOk8nw1XaegZqAUHVMdKl8cvCm2I0hzD",
    caption: "Caption text"
  },
  {
    name: "img6.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypXvexFA98rxUQbyG5SIKEjtvlue3LsoFaAVg7",
    caption: "Caption text"
  },
  {
    name: "img5.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lyppif6t3QGO9byLSIco7x01Mhq42gB8dAWHFtv",
    caption: "Caption text"
  },
  {
    name: "img4.jpeg",
    url: "https://utfs.io/f/eySWb67X0LyppBvWIw3QGO9byLSIco7x01Mhq42gB8dAWHFt",
    caption: "Caption text"
  },
  {
    name: "img3.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lyp6GRjPhkicNopfLslVa40TIF7YGeuC53mrjAb",
    caption: "Caption text"
  },
  {
    name: "img2.jpeg",
    url: "https://utfs.io/f/eySWb67X0Lypz8yt3BCaF8RvUCB0tN634gbfqj7HMh1AGlex",
    caption: "Caption text"
  },
  {
    name: "img1.jpeg",
    url: "https://utfs.io/f/eySWb67X0LypawLrPf46JE7GOrycKQZugpfYvhP1lTxdCNwD",
    caption: "Caption text"
  },
];


export default function Work() {
    const [fullscreenImage, setFullscreenImage] = useState<{
      url: string;
      caption: string;
    } | null>(null);
  
    // Create a ref for the modal container
    const modalRef = useRef<HTMLDivElement | null>(null);
  
    // Automatically focus on the modal when it opens
    useEffect(() => {
      if (fullscreenImage && modalRef.current) {
        modalRef.current.focus();
      }
    }, [fullscreenImage]);
  
    // Function to handle closing the modal via keyboard (Escape key)
    const handleKeyPress = (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        setFullscreenImage(null);
      }
    };
  
    return (
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Work</h1>
  
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() =>
                setFullscreenImage({ url: image.url, caption: image.caption })
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                setFullscreenImage({ url: image.url, caption: image.caption })
              }
            >
              <img
                src={image.url}
                alt={`Artwork ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
  
        {/* Fullscreen Modal */}
        {fullscreenImage && (
          <div
            ref={modalRef} // Attach the ref to the modal container
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            tabIndex={-1} // Make the modal focusable
            onKeyDown={handleKeyPress}
            onClick={() => setFullscreenImage(null)} // Close modal on click anywhere
          >
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              {/* Image */}
              <img
                src={fullscreenImage.url}
                alt="Fullscreen artwork"
                className="w-auto max-w-[90vw] max-h-[90vh] object-contain md:max-w-[70vw] md:max-h-[70vh] " // Adjust for fullscreen
              />
  
              {/* Caption */}
              <p className="absolute bottom-5 left-5 text-white text-sm sm:text-base md:text-lg">
                {fullscreenImage.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
  