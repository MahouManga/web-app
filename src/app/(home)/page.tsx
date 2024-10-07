import NavBar from "@/components/Navbar/Index";
import Image from "next/image"; // Para usar imagens otimizadas com Next.js

export default function Home() {
  return (
    <>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-between p-8 bg-base-100 text-base-content min-h-screen">
        
        {/* Banner Section */}
        <section className="w-full mb-8">
          <div className="relative bg-base-200 rounded-lg p-6">
            <Image
              src="/noImage.jpg" // Certifique-se de ter a imagem em public/banner.png
              alt="Banner"
              width={1920}
              height={400}
              className="w-full h-64 object-cover rounded-lg"
            />
            {/* Dots for Carousel */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
              <span className="bg-white h-2 w-2 rounded-full inline-block"></span>
              <span className="bg-gray-400 h-2 w-2 rounded-full inline-block"></span>
              <span className="bg-gray-400 h-2 w-2 rounded-full inline-block"></span>
            </div>
          </div>
        </section>

        {/* Lançamentos Section */}
        <section className="w-full">
          <h2 className="text-2xl font-bold mb-6">Lançamentos</h2>
          <div className="grid grid-cols-6 gap-4">
            {/* Card de Mangá 1 */}
            <div className="bg-base-300 p-4 rounded-lg text-center items-center">
              <Image
                src="/noImage.jpg" // Imagem do mangá (coloque as imagens em public/)
                alt="One Piece"
                width={200}
                height={300}
                className="h-48 w-full object-cover rounded-lg mb-2"
              />
              <h3 className="font-bold text-lg">One Piece</h3>
              <p>Cap 1220</p>
            </div>

            {/* Card de Mangá 2 */}
            <div className="bg-base-300 p-4 rounded-lg text-center">
              <Image
                src="/noImage.jpg" // Outra imagem de mangá
                alt="Naruto"
                width={200}
                height={300}
                className="h-48 w-full object-cover rounded-lg mb-2"
              />
              <h3 className="font-bold text-lg">Naruto</h3>
              <p>Cap 700</p>
            </div>

            {/* Adicione mais cards aqui conforme necessário */}
          </div>
        </section>

        {/* Sidebar Section (opcional) */}
        <aside className="w-full mt-8">
          <div className="bg-base-300 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Mais Vistos</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>My Seven Sister Spoiled Me a Lot Ch.6</span>
                <span className="">5 dias</span>
              </li>
              <li className="flex justify-between">
                <span>Hero Killer Ch.10</span>
                <span className="">4 dias</span>
              </li>
              {/* Adicione mais itens da sidebar aqui */}
            </ul>
          </div>
        </aside>

      </main>
    </>
  );
}
