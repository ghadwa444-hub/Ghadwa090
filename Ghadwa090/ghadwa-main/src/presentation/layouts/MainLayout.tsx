
import React, { ReactNode } from 'react';
import { Navbar } from '@/presentation/components/shared/Navbar';
import { Footer } from '@/presentation/components/shared/Footer';
import { CartDrawer } from '@/presentation/features/cart/CartDrawer';
import { MenuModal, ChefConflictModal, ClearCartModal } from '@/presentation/components/shared/Modals';
import { useCart } from '@/application/context/CartContext';
import { useData } from '@/application/context/DataContext';
import { LoadingScreen } from '@/presentation/components/ui/UIHelpers';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export const MainLayout: React.FC = () => {
    const {
        cart,
        isCartOpen,
        conflictModal,
        isClearCartModalOpen,
        openCart,
        closeCart,
        updateQuantity,
        handleClearCartAndAdd,
        handleClearCart,
        setConflictModal,
        setIsClearCartModalOpen
    } = useCart();

    const { contactSettings, isLoading, chefs } = useData();
    const navigate = useNavigate();
    const location = useLocation();

    // Derived state for currentPage (for Navbar styling, etc.)
    const currentPage = location.pathname === '/' ? 'home' : location.pathname.substring(1);

    if (isLoading) {
        return <LoadingScreen />;
    }

    const getCurrentChefId = (): string | null => {
        if (cart.length === 0) return null;
        return cart[0].chef_id || null;
    };

    const getChefNameById = (chefId: string | null | undefined): string => {
        if (!chefId) return 'مطبخ';
        const chef = chefs.find(c => c.id === chefId);
        return chef?.chef_name || 'مطبخ';
    };

    // Helper for navigation adapter for Navbar
    const handleNavigate = (page: string) => {
        if (page === 'home') navigate('/');
        else navigate(`/${page}`);
    };

    const currentChefName = cart.length > 0 ? (cart[0].chef || getChefNameById(cart[0].chef_id)) : null;

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Context-aware Modals */}
            <MenuModal isOpen={false} onClose={() => { }} /> {/* Placeholder or manage via context if needed globally */}

            <CartDrawer
                isOpen={isCartOpen}
                onClose={closeCart}
                cart={cart}
                updateQuantity={updateQuantity}
                onCheckout={() => {
                    closeCart();
                    navigate('/checkout');
                }}
                onClearCart={() => setIsClearCartModalOpen(true)}
            />

            <ChefConflictModal
                isOpen={conflictModal.isOpen}
                onClose={() => setConflictModal({ isOpen: false, item: null, newQuantity: 0 })}
                onConfirm={handleClearCartAndAdd}
                currentChef={getCurrentChefId() ? getChefNameById(getCurrentChefId()) : currentChefName || 'مطبخ'}
                newChef={conflictModal.item?.chef_id ? getChefNameById(conflictModal.item.chef_id) : (conflictModal.item?.chef || 'مطبخ')}
            />

            <ClearCartModal
                isOpen={isClearCartModalOpen}
                onClose={() => setIsClearCartModalOpen(false)}
                onConfirm={handleClearCart}
            />

            <Navbar
                onNavigate={handleNavigate}
                currentPage={currentPage}
                cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                favoritesCount={0} // TODO: Implement FavoritesContext
                onOpenCart={openCart}
                onOpenMenu={() => { }} // TODO: Menu modal state
                contactSettings={contactSettings}
            />

            <main>
                <Outlet />
            </main>

            <Footer contactSettings={contactSettings} onNavigate={handleNavigate} currentPage={currentPage} />
        </div>
    );
};
