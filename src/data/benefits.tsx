import { MapPin, Edit3, Info, MousePointer2, Lightbulb, Clock } from "lucide-react";
import { colors } from "@/styles";
import type { IBenefit } from "@/components/features/benefits/types";
import comoFunciona from "../assets/images/guia-turistico.webp";
import _guiaPropuestaDark from "../assets/images/idea-dark.webp";
import guiaPropuestaLight from "../assets/images/idea-light.webp";
import { SECTION_IDS } from "./menu-item";

export const benefits: IBenefit[] = [
    {
        id: SECTION_IDS.howWork,
        title: "¿Cómo funciona?",
        description: "Seleccioná una calle sin nombre en el mapa interactivo y proponé un nombre justificando tu elección. ¡Tu participación es fundamental!",
        bullets: [
            {
                title: "No se aceptarán nombres que ya existan",
                description: "Verificá en el buscador si ya existe una calle con ese nombre.",
                icon: <Info size={26} color={colors.primary} />,
            },
            {
                title: "Explorá el mapa",
                description: (
                    <>
                        Las calles sin nombre están en color{" "}
                        <span className="text-primary font-bold">naranja</span>. Hacé click en una para selecionarla.
                    </>
                ),
                icon: <MapPin size={26} color={colors.primary} />,
            },
            {
                title: "Completá el formulario",
                description: "Ingresá tus datos y el nombre que proponés.",
                icon: <Edit3 size={26} color={colors.primary} />,
            },
        ],
        imageSrc: comoFunciona,
    },
    {
        id: SECTION_IDS.guide,
        title: "Guía para tu propuesta",
        description: "Seguí estos consejos y pasos para crear una propuesta exitosa que honre la historia y cultura local.",
        bullets: [
            {
                title: "Cómo empezar",
                description: (
                    <>
                        Hacé clic en una calle <span className="text-primary font-semibold">naranja</span> (sin nombre) en el mapa interactivo para seleccionarla y completar el formulario.
                    </>
                ),
                icon: <MousePointer2 size={26} color={colors.primary} />,
            },
            {
                title: "Consejos para tu propuesta",
                description: "Analizá la historia local, honra figuras importantes, considerá la cultura del área y evitá nombres duplicados.",
                icon: <Lightbulb size={26} color={colors.primary} />,
            },
            {
                title: "Proceso de revisión",
                description: (
                    <>
                        Tu propuesta será evaluada por la <span className="font-semibold">Junta Municipal</span> antes de la aprobación final.
                    </>
                ),
                icon: <Clock size={26} color={colors.primary} />,
            },
        ],
        imageSrc: guiaPropuestaLight,
    },
]