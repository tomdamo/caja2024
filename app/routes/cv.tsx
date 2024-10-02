  export default function CV() {
    return (
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">CV</h1>
  
        {/* Flex container for layout on larger screens */}
        <div className="flex flex-col lg:flex-row">
          {/* CV Section */}
          <div className="lg:w-2/3">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Exhibition</h2>
              <ul className="space-y-4">
                <li>
                  <strong>2024</strong> - Daily encounters and how to catch them, Museum Helmond, Helmond, groupshow
                </li>
                <li>
                  <strong>2024</strong> - ECHTER, Moving Gallery, Utrecht, groupshow
                </li>
                <li>
                  <strong>2024</strong> - Art Rotterdam, Best of Graduates Legacy, Galerie Ron Mandos, groupshow
                </li>
                <li>
                  <strong>2024</strong> - Art Rotterdam, Represented by Galerie Gerhard Hofland, Rotterdam, groupshow
                </li>
                <li>
                  <strong>2023</strong> - Closing Distance, Galerie Weisbard, Rotterdam, solo-show
                </li>
                <li>
                  <strong>2023</strong> - Maidentrip, Collectie de Groen, Arnhem, solo-show
                </li>
                <li>
                  <strong>2023</strong> - Best of Graduates, Galerie Ron Mandos, Amsterdam, groupshow
                </li>
                <li>
                  <strong>2023</strong> - HKU Exposure, HKU Fine Art, Utrecht, graduation show
                </li>
                <li>
                  <strong>2023</strong> - PARTITIONS, Galerie Gerhard Hofland, Amsterdam, duoshow
                </li>
                <li>
                  <strong>2023</strong> - TRAILER, AG, Utrecht, groupshow
                </li>
                <li>
                  <strong>2023</strong> - A Touch of Light, Museum Kranenburgh, Bergen, groupshow
                </li>
                <li>
                  <strong>2022</strong> - PEEK Pastoe, HKU Fine Art, Utrecht, groupshow
                </li>
                <li>
                  <strong>2022</strong> - The NEXT: KapSalon, Herman van Veen Arts Center, Soest, groupshow
                </li>
                <li>
                  <strong>2021</strong> - CURRENT CURRENT CURRENT, OMSTAND, Arnhem, groupshow
                </li>
                <li>
                  <strong>2021</strong> - Virtual Empathy, AG, Utrecht, groupshow
                </li>
              </ul>
            </section>
  
                  {/* Education Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <ul className="space-y-4">
            <li>
              <strong>2019-2023</strong> - BA Fine Art, Hogeschool voor de Kunsten Utrecht
            </li>
            <li>
              <strong>2022</strong> - Internship Pennie Key, Rijksakademie
            </li>
          </ul>
        </section>
  
        {/* Residencies Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Residencies</h2>
          <ul className="space-y-4">
            <li>
              <strong>2023</strong> - Lakeside Collection Award, Artist-in-residence, Depot Boijmans Van Beuningen, Rotterdam
            </li>
          </ul>
        </section>
  
        {/* Publications Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Publications</h2>
          <ul className="space-y-4">
            <li>
              <strong>10 juli 2023</strong> - ‘De vliegende start van drie jonge kunstenaars’ by Anna van Leeuwen, de Volkskrant
            </li>
            <li>
              <strong>2023</strong> - Metropolis M: Inkomen & Eindexamens by Eli Witteman
            </li>
            <li>
              <strong>18 juni 2023</strong> - Nu te Zien: A touch of light, AVROTROS
            </li>
            <li>
              <strong>30 november 2023</strong> - MuseumTV: Kunstbeloften: Caja Boogers
            </li>
          </ul>
        </section>
  
        {/* Extra Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Extra</h2>
          <p className="mb-4">
            Works have been acquired by collections such as:
          </p>
          <ul className="list-disc list-inside">
            <li>Museum Voorlinden</li>
            <li>Akzo Nobel Art Foundation</li>
            <li>Lakeside Collection</li>
            <li>Ministerie van Binnenlandse Zaken</li>
            <li>ING Collection</li>
            <li>Verder Collectie</li>
            <li>Collectie de Groen</li>
          </ul>
        </section>
          </div>
  
          {/* Image Section */}
          <div className="lg:w-1/3 lg:pl-8 mt-8 lg:mt-0">
            <img
              src="https://utfs.io/f/eySWb67X0LypKwFSdsVSNOs8z3nexXov4D2rtG6Hqa5MpAc1"
              alt="Artwork of Caja Boogers"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    );
  }
  