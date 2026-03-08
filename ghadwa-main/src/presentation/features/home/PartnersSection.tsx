import React, { useEffect, useState } from 'react';
import { api } from '@/infrastructure/api/api';
import { Partner } from '@/core/domain/entities';

export const PartnersSection: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const data = await api.getPartners();
                setPartners(data);
            } catch (error) {
                console.error('Failed to fetch partners', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPartners();
    }, []);

    if (loading) return null; // Or a skeleton
    if (partners.length === 0) return null;

    return (
        <section className="py-16 bg-white overflow-hidden" id="partners">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-cairo">شركاء النجاح</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        نفخر بالتعاون مع نخبة من المؤسسات والشركات
                    </p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {partners.map((partner) => (
                        <a
                            key={partner.id}
                            href={partner.website_url || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
                        >
                            <img
                                src={partner.logo_url || 'https://via.placeholder.com/150'}
                                alt={partner.name}
                                className="h-16 md:h-20 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
