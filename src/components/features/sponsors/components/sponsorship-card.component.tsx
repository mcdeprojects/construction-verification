import { CustomBotton } from "@/components/ui";
import type React from "react";
import { toast } from "sonner";

export const SponsorshipCard: React.FC = () => {
  const handleContactClick = () => {
    const email = "bogado.richard@gmail.com";
    const subject = 'Interés en patrocinar el proyecto "Mapa interactivo"';
    const body = "Hola, estoy interesado en patrocinar el proyecto...";

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}`;

    setTimeout(() => {
      toast.info("¿No se abrió tu correo?", {
        description: "Podés abrir Gmail en el navegador",
        action: {
          label: "Abrir Gmail",
          onClick: () => {
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`;
            window.open(gmailUrl, "_blank");
          },
        },
        duration: 5000,
      });
    }, 1000);
  };

  return (
    <div
      className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-900 
                rounded-2xl shadow-xl border border-orange-200 dark:border-slate-700 
                p-6 md:p-10 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          ¿Querés ser parte de nuestro proyecto?
        </h3>

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          <span className="font-bold">Contáctanos</span>, vamos a agradecer el
          gesto agregando el{" "}
          <span className="text-primary font-bold">logo de tu empresa </span>
          en un espacio reservado en cada cartel.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <CustomBotton
            type="button"
            onClick={handleContactClick}
            variant="primary"
          >
            Quiero ser patrocinador
          </CustomBotton>
        </div>
      </div>
    </div>
  );
};
