import React, { useState, useEffect } from 'react';
import { ContactSettings } from '@/core/domain/entities';

interface NavbarProps {
    onNavigate: (page: string) => void;
    currentPage: string;
    cartCount: number;
    favoritesCount: number;
    onOpenCart: () => void;
    onOpenMenu: () => void;
    contactSettings?: ContactSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, cartCount, favoritesCount, onOpenCart, onOpenMenu, contactSettings }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fallback numbers/links
    const whatsappNumber = contactSettings?.whatsapp || "201109318581";

    const navLinks = [
        { id: 'top', label: 'الرئيسية' },
        { id: 'weekly-offers', label: 'العروض' },
        { id: 'boxes', label: 'البوكسات' },
        { id: 'healthy', label: 'هيلثي' },
        { id: 'frozen', label: 'مجمدات' },
        { id: 'menu', label: 'المنيو' },
        { id: 'chefs', label: 'شيفاتنا' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setIsMobileMenuOpen(false);
        if (id === 'top' || currentPage !== 'home') {
            onNavigate('home');
            if (id === 'top') {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
            return;
        }

        // If on home and not top
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent py-2'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-28">

                    {/* Logo Section */}
                    <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
                        <img src="/logo-main.png" alt="غدوة" className="h-40 w-auto object-contain transition-transform group-hover:scale-105" />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-reverse space-x-4 xl:space-x-6">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => {
                                    if (link.id === 'top') scrollToSection(link.id);
                                    else if (link.id === 'weekly-offers') onNavigate('offers');
                                    else if (link.id === 'boxes') onNavigate('boxes');
                                    else if (link.id === 'healthy') onNavigate('healthy');
                                    else if (link.id === 'frozen') onNavigate('frozen');
                                    else if (link.id === 'menu') onNavigate('menu');
                                    else if (link.id === 'chefs') onNavigate('all-chefs');
                                    else scrollToSection(link.id);
                                }}
                                className={`font-bold px-3 py-2 rounded-lg transition-all duration-200 text-sm xl:text-base whitespace-nowrap ${scrolled ? 'text-gray-600 hover:text-primary-800 hover:bg-primary-50' : 'text-gray-700 hover:text-primary-800 hover:bg-white/50'}`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={() => onNavigate('menu')}
                            className={`hidden sm:flex items-center gap-2 px-4 py-2 border rounded-full transition-all text-sm font-bold ${scrolled ? 'border-gray-200 text-gray-700 hover:border-primary-200 hover:bg-primary-50' : 'border-gray-300 bg-white/80 text-gray-800 hover:bg-white'}`}
                        >
                            <i className="fa-solid fa-utensils text-primary-600"></i>
                            <span>اطلب دلوقتي</span>
                        </button>

                        <button
                            onClick={onOpenCart}
                            className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all group ${scrolled ? 'bg-primary-50 text-primary-800 hover:bg-primary-100' : 'bg-white text-gray-800 shadow-sm hover:shadow-md'}`}
                            aria-label="سلة المشتريات"
                        >
                            <i className="fa-solid fa-basket-shopping text-xl group-hover:scale-110 transition-transform"></i>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce-slow">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden w-10 h-10 flex items-center justify-center text-lg ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}
                        >
                            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 animate-fade-in-up">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    if (link.id === 'top') scrollToSection(link.id);
                                    else if (link.id === 'weekly-offers') onNavigate('offers');
                                    else if (link.id === 'boxes') onNavigate('boxes');
                                    else if (link.id === 'healthy') onNavigate('healthy');
                                    else if (link.id === 'frozen') onNavigate('frozen');
                                    else if (link.id === 'menu') onNavigate('menu');
                                    else if (link.id === 'chefs') onNavigate('all-chefs');
                                    else scrollToSection(link.id);
                                }}
                                className="block w-full text-right px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-800 rounded-lg font-bold transition-colors border-b border-gray-50 last:border-0"
                            >
                                {link.label}
                            </button>
                        ))}

                        <div className="pt-4 flex flex-col gap-3">
                            <button
                                onClick={() => { onNavigate('menu'); setIsMobileMenuOpen(false); }}
                                className="block w-full text-center px-4 py-3 text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-xl font-bold transition-colors border border-primary-100"
                            >
                                <i className="fa-solid fa-utensils ml-2"></i>
                                اطلب دلوقتي
                            </button>

                            {/* Mobile Auth Buttons Removed */}

                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full text-center px-4 py-3 text-green-700 bg-green-50 hover:bg-green-100 rounded-xl font-bold transition-colors border border-green-200"
                            >
                                <i className="fa-brands fa-whatsapp ml-2"></i>
                                تواصل معنا
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
