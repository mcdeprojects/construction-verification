import { Container } from "@/components/ui";
import { CarouselPlugin } from "@/components/features/hero/carousel-plugin.componet";
import { SocialMediaContact } from "./social-media-contact.component";

export const Hero: React.FC = () => {
  return (
    <Container id="hero" className="pt-26">
      <div className="text-center flex justify-center flex-col gap-y-10">
        <h1 className="text-primary text-4xl lg:text-5xl md:leading-tight font-bold max-w-lg md:max-w-2xl mx-auto">
          ¡Nombremos juntos las calles de nuestra ciudad!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center leading-relaxed">
          Gracias al impulso del concejal{" "}
          <span className="font-semibold">Seba Martínez</span> y la
          <span className="font-semibold"> participación vecinal</span>,
          lanzamos la segunda fase del proyecto,{" "}
          <span className="font-semibold">"Mapa interactivo"</span> para
          proponer nombres a las calles aún sin identificar.
        </p>

        <SocialMediaContact />

        <CarouselPlugin />
      </div>
    </Container>
  );
};
