import clsx from "clsx";
import { motion } from "framer-motion";
import type { IBenefit } from "./types";
import { childVariants, containerVariants } from "./variants";
import { SectionTitle } from "@/components/ui";
import { BenefitBullet } from "./benefit-bullet.component";

interface Props {
    benefit: IBenefit;
    imageAtRight?: boolean;
}

export const BenefitSection: React.FC<Props> = ({ benefit, imageAtRight }) => {
    const { title, description, imageSrc, bullets, id } = benefit;

    return (
        <section id={id}>
            <motion.div
                className="flex flex-wrap flex-col items-center justify-start gap-2 lg:flex-row lg:gap-20 lg:flex-nowrap pt-24"
                variants={containerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
            >
                <div
                    className={clsx("flex flex-wrap items-center w-full", {
                        "justify-start": imageAtRight,
                        "lg:order-1 justify-end": !imageAtRight
                    })}
                >
                    <div className="w-full text-center lg:text-left p-4">
                        <motion.div className="flex flex-col w-full" variants={childVariants}>
                            <SectionTitle>
                                <h3 className="text-primary lg:max-w-2xl mb-4">{title}</h3>
                            </SectionTitle>

                            <p className="mx-auto lg:ml-0 leading-normal text-foreground-accent text-gray-600 dark:text-slate-300">
                                {description}
                            </p>
                        </motion.div>

                        <div className="mx-auto lg:ml-0 w-full">
                            {bullets.map((item, index) => (
                                <BenefitBullet
                                    key={index}
                                    title={item.title}
                                    icon={item.icon}
                                    description={item.description}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={clsx("mt-5 lg:mt-0", { "lg:order-2": imageAtRight })}>
                    <div
                        className={clsx("w-fit flex", {
                            "justify-start": imageAtRight,
                            "justify-end": !imageAtRight
                        })}
                    >
                        <img
                            src={imageSrc}
                            alt={title}
                            width={384}
                            height={762}
                            className="hidden lg:ml-0 lg:block"
                            loading="lazy"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
