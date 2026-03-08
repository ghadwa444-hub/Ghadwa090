import React from 'react';
import { ContactSettings } from '@/core/domain/entities';

interface FooterProps {
    contactSettings?: ContactSettings;
    currentPage?: string;
    onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ contactSettings, onNavigate, currentPage }) => {
    // Default fallback if not yet loaded
    const settings = contactSettings || {
        phone: "201109318581",
        whatsapp: "201109318581",
        email: "ghadwa444@gmail.com",
        address: "طنطا، مصر",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
    };

    const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
        e.preventDefault();

        const doScroll = () => {
            if (sectionId === 'top') {
                window.scrollTo({ top: 0, behavior: 'instant' });
            } else {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        if (currentPage === 'home') {
            doScroll();
        } else {
            onNavigate('home');
            setTimeout(doScroll, 300);
        }
    };

    // Map database fields to display fields
    const facebookUrl = settings.facebook || "#";
    const instagramUrl = settings.instagram || "#";
    const linkedinUrl = settings.linkedin || "#";

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1a1515] text-white pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 border-t border-white/5 relative overflow-hidden">
            {/* Decorative Top Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-900 via-primary-700 to-primary-900 opacity-60"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-16 mb-16 sm:mb-20">
                    {/* Brand Section */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <div className="mb-2 -mt-10">
                            <img src="/logo-white.png" alt="غدوة" className="h-40 w-auto object-contain object-top" />
                        </div>
                        <p className="text-white/60 text-sm leading-7 mb-8 max-w-sm">
                            أول منصة مصرية بتجمع ستات البيوت الشاطرة في مكان واحد. بنوصلك أكل بيتي نضيف، صحي، ومطبوخ بحب زي أكل ماما بالظبط.
                        </p>
                        <div className="flex gap-4 items-center">
                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/company/ghadwa/"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
                                aria-label="LinkedIn"
                            >
                                <i className="fa-brands fa-linkedin-in text-lg group-hover:text-[#0077B5] transition-colors"></i>
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/share/1ARNMRNx4n/"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
                                aria-label="Facebook"
                            >
                                <i className="fa-brands fa-facebook-f text-lg group-hover:text-[#1877F2] transition-colors"></i>
                            </a>



                            {/* WhatsApp (Dynamic) */}
                            {settings.whatsapp && (
                                <a
                                    href={`https://wa.me/${settings.whatsapp}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
                                    aria-label="WhatsApp"
                                >
                                    <i className="fa-brands fa-whatsapp text-lg group-hover:text-[#25D366] transition-colors"></i>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-lg mb-6 text-white border-b border-primary-900/50 pb-2 inline-block">روابط سريعة</h4>
                        <ul className="space-y-4 text-white/60 text-sm">
                            <li>
                                <a href="#" onClick={(e) => handleSectionClick(e, 'top')} className="hover:text-primary-400 hover:translate-x-1 transition-all inline-block">
                                    عن غدوة
                                </a>
                            </li>
                            <li>
                                <a href="#chefs" onClick={(e) => handleSectionClick(e, 'chefs')} className="hover:text-primary-400 hover:translate-x-1 transition-all inline-block">
                                    الشيفات (أبطالنا)
                                </a>
                            </li>
                            <li>
                                <a href="#menu" onClick={(e) => handleSectionClick(e, 'menu')} className="hover:text-primary-400 hover:translate-x-1 transition-all inline-block">
                                    المنيو الكامل
                                </a>
                            </li>
                            <li>
                                <a href="#weekly-offers" onClick={(e) => handleSectionClick(e, 'weekly-offers')} className="hover:text-primary-400 hover:translate-x-1 transition-all inline-block">
                                    العروض الأسبوعية
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Help & Support */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-lg mb-6 text-white border-b border-primary-900/50 pb-2 inline-block">المساعدة</h4>
                        <ul className="space-y-4 text-white/60 text-sm">
                            <li>
                                <button onClick={() => onNavigate('faq')} className="hover:text-primary-400 hover:translate-x-1 transition-all inline-block">
                                    الأسئلة الشائعة
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate('terms')} className="hover:text-primary-400 hover:translate-x-1 transition-all inline-block">
                                    شروط الاستخدام
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate('privacy')} className="hover:text-primary-400 hover:translate-x-1 transition-all inline-block">
                                    سياسة الخصوصية
                                </button>
                            </li>
                            <li>
                                <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-primary-400 hover:translate-x-1 transition-all inline-block">
                                    طلب مساعدة
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <h4 className="font-bold text-lg mb-6 text-white border-b border-primary-900/50 pb-2 inline-block">معلومات التواصل</h4>
                        <ul className="space-y-4 text-white/60 text-sm">
                            <li className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                                    <i className="fa-solid fa-location-dot text-primary-400 text-xs"></i>
                                </div>
                                <span className="pt-1.5">{settings.address}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <i className="fa-solid fa-phone text-primary-400 text-xs"></i>
                                </div>
                                <a href={`tel:${settings.phone}`} className="hover:text-white transition pt-0.5">
                                    {settings.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <i className="fa-solid fa-envelope text-primary-400 text-xs"></i>
                                </div>
                                <a href={`mailto:${settings.email}`} className="hover:text-white transition pt-0.5 font-sans">
                                    {settings.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright & Legal */}
                <div className="pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-right text-white/40 text-xs">
                            <p className="mb-2">© {currentYear} Ghadwa. جميع الحقوق محفوظة.</p>
                            <p>صنع في مصر بكل حب ❤️</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 text-xs text-white/40">
                            <a href="#" className="hover:text-white transition-colors">عن المطورين</a>
                            <a href="#" className="hover:text-white transition-colors">انضم لفريق العمل</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
