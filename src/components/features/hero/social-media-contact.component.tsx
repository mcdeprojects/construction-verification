import { Facebook, Instagram, WhatsApp } from "@/components/icons";
import { Button } from "@/components/ui/button";

export const SocialMediaContact: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-4 flex-wrap">
      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        Seguí al concejal:
      </span>
      <div className="flex gap-3 flex-wrap justify-center">
        <Button variant="outline" asChild>
          <a
            href="https://wa.me/595974134890?text=Hola%20Seba%2C%20te%20escribo%20desde%20la%20web%20del%20Mapa%20Interactivo.%20Tengo%20una%20consulta%20sobre%20el%20proyecto."
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp />
            WhatsApp
          </a>
        </Button>

        <Button variant="outline" asChild>
          <a
            href="https://www.facebook.com/share/1K8y2noNwS/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
            Facebook
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href="https://www.instagram.com/sebapy?igsh=MW83MmJpb2pyNnRvbQ=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
            Instagram
          </a>
        </Button>
      </div>
    </div>
  );
};
