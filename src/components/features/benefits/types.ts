import type { JSX } from "react";

export interface IBenefit {
    id?: string;
    title: string;
    description: string;
    imageSrc: string;
    bullets: IBenefitBullet[]
}

export interface IBenefitBullet {
    title: string;
    description: React.ReactNode;
    icon: JSX.Element;
}