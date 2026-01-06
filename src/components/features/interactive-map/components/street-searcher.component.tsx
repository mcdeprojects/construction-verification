import React from 'react';
import { streetColors } from '@/styles';
import type { Parc } from './parc.interface';

interface Props {
    parcData: Parc;
    onStreetFound: (codigo: string, nombre: string) => void;
}

export const StreetSearcher: React.FC<Props> = ({ parcData, onStreetFound }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    const cleanSearchTerm = (searchTerm: string, streetExists: boolean | null) => {
        if (searchTerm.trim() === '') return ;
        if (streetExists ) return
        setSearchTerm('')
    };

    // Crear lista de calles con nombres únicos
    const streetsWithNames = React.useMemo(() => {
        const uniqueStreets = new Map();

        parcData.features.forEach(feature => {
            if (feature.properties.NOMBRE && feature.properties.NOMBRE.trim()) {
                const name = feature.properties.NOMBRE.trim().toUpperCase();
                const code = feature.properties.CODIGO_CAL;

                if (!uniqueStreets.has(name)) {
                    uniqueStreets.set(name, {
                        nombre: feature.properties.NOMBRE,
                        codigo: code,
                        barrio: feature.properties.BARRIO_NOM
                    });
                }
            }
        });

        return Array.from(uniqueStreets.values()).sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
        );
    }, [parcData]);

    // Filtrar calles basado en la búsqueda
    const filteredStreets = React.useMemo(() => {
        if (!searchTerm.trim()) return [];

        const term = searchTerm.toUpperCase();
        return streetsWithNames.filter(street =>
            street.nombre.toUpperCase().includes(term)
        ).slice(0, 10);
    }, [searchTerm, streetsWithNames]);

    const handleStreetSelect = (street: any) => {
        setSearchTerm(street.nombre);
        setIsOpen(false);
        onStreetFound(street.codigo, street.nombre);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
    };

    const checkStreetExists = () => {
        if (!searchTerm.trim()) return null;

        const exists = streetsWithNames.some(street =>
            street.nombre.toUpperCase() === searchTerm.toUpperCase()
        );

        return exists;
    };

    const streetExists = checkStreetExists();

    return (
        <div className="md:pt-5">
            <h2 className="text-2xl md:text-3xl text-center mb-4">
                Buscador de Cuentas
            </h2>
            <div className="flex justify-center">
                <div className="relative w-full max-w-md z-[1000]">
                    <div className="relative">
                        <input
                            id='street-search-input'
                            name='street-search-input'
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onFocus={() => setIsOpen(true)}
                            placeholder="Escribi el numero de cuenta..."
                            style={{
                                color: streetExists === true
                                    ? streetColors.found
                                    : streetExists === false
                                        ? streetColors.withoutName
                                        : streetColors.default,
                                borderColor: streetExists === true
                                    ? streetColors.found
                                    : streetExists === false
                                        ? streetColors.withoutName
                                        : streetColors.default
                            }}
                            className={
                                `w-full px-4 py-2 border-2 rounded-lg focus:outline-none 
                                focus:ring-2 transition-colors 
                                ${streetExists === true
                                    ? 'bg-green-50 dark:bg-slate-800/80 focus:ring-green-200'
                                    : streetExists === false
                                        ? 'bg-orange-50 dark:bg-slate-800/80 focus:ring-orange-200'
                                        : 'border-gray-300 focus:ring-blue-200'
                                }`}
                        />

                        {searchTerm.trim() && (
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => cleanSearchTerm(searchTerm, streetExists)}
                            >
                                {streetExists ? (
                                    <div
                                        className="flex items-center"
                                        style={{ color: streetColors.found }}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div
                                        className="flex items-center"
                                        style={{ color: streetColors.withoutName }}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className='h-7 m-0 py-auto'>
                        {searchTerm.trim() && (
                            <div
                                className="text-sm"
                                style={{ color: streetExists ? streetColors.found : streetColors.withoutName }}
                            >
                                {streetExists
                                    ? '✓ Este nombre ya existe'
                                    : '✗ Esta aún no existe'
                                }
                            </div>
                        )}
                    </div>

                    {isOpen && filteredStreets.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredStreets.map((street, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleStreetSelect(street)}
                                    className="px-4 py-2 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                >
                                    <div className="font-medium text-gray-900">{street.nombre}</div>
                                    <div className="text-sm text-gray-500">{street.barrio}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {isOpen && (
                        <div
                            className="fixed inset-0 z-5"
                            onClick={() => setIsOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};