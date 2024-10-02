export default function Contact() {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <p> Send me an email:
        <a href="contact@cajaboogers.com" className="text-black underline mt-4 inline-block">
                contact@cajaboogers.com
            </a>
        </p>
        <p> 
            Message me on Instagram:
            <a href="https://instagram.com/cajaboogers" className="text-black underline mt-4 inline-block">
                @cajaboogers
            </a>
        </p>
      </div>
    );
  }