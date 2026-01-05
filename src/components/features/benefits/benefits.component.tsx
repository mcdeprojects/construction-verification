import { Container } from "@/components/ui"
import { benefits } from "@/data"
import { BenefitSection } from "./benefits-section.component"

export const Benefits: React.FC = () => {
    return (
        <Container>
            {benefits.map((item, index) => {
                return (<BenefitSection
                    key={index}
                    benefit={item}
                    imageAtRight={index % 2 !== 0}
                />)
            })}
        </Container>
    )
}
