import newZoneLight from "@assets/sponsors/newzone-light.png"
import newZoneDark from "@assets/sponsors/newzone-dark.png"

interface Sponsor {
    id: string;
    name: string;
    logo: { light: string; dark: string };
    website?: string;
    showName: boolean;
}

export const currentSponsors: Sponsor[] = [
    {
        id: '1',
        name: 'New Zone',
        logo: { light: newZoneLight, dark: newZoneDark },
        website: 'https://newzone.com.py/',
        showName: false
    },
];
