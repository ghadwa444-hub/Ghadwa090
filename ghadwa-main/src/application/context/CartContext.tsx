
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, MenuItem, Chef } from '@/core/domain/entities';

interface ConflictModalState {
    isOpen: boolean;
    item: MenuItem | null;
    newQuantity: number;
}

interface CartContextType {
    cart: CartItem[];
    isCartOpen: boolean;
    conflictModal: ConflictModalState;
    isClearCartModalOpen: boolean;
    getChefNameById: (chefId: string | null | undefined) => string;

    // Actions
    openCart: () => void;
    closeCart: () => void;
    updateQuantity: (id: string | number, newQty: number, itemToAdd?: MenuItem) => void;
    handleClearCartAndAdd: () => void;
    handleClearCart: () => void;
    setConflictModal: (state: ConflictModalState) => void;
    setIsClearCartModalOpen: (isOpen: boolean) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
    chefs: Chef[];
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, chefs }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [conflictModal, setConflictModal] = useState<ConflictModalState>({ isOpen: false, item: null, newQuantity: 0 });
    const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

    // Get current chef_id from cart (use first item's chef_id)
    const getCurrentChefId = (): string | null => {
        if (cart.length === 0) return null;
        return cart[0].chef_id || null;
    };

    // Helper to get chef name from chef_id
    const getChefNameById = (chefId: string | null | undefined): string => {
        if (!chefId) return 'مطبخ';
        const chef = chefs.find(c => c.id === chefId);
        return chef?.chef_name || 'مطبخ';
    };

    const updateQuantity = (id: string | number, newQty: number, itemToAdd?: MenuItem) => {
        if (newQty < 0) return;

        // Chef conflict check - prevent adding items from different chefs
        if (itemToAdd && cart.length > 0) {
            const currentChefId = getCurrentChefId();
            const newItemChefId = itemToAdd.chef_id;

            // If there's a chef mismatch, show conflict modal
            if (currentChefId && newItemChefId && currentChefId !== newItemChefId) {
                setConflictModal({
                    isOpen: true,
                    item: itemToAdd,
                    newQuantity: newQty
                });
                return;
            }
        }

        if (newQty === 0) {
            setCart(prev => prev.filter(item => String(item.id) !== String(id)));
        } else {
            setCart(prev => {
                const exists = prev.find(item => String(item.id) === String(id));
                if (exists) {
                    return prev.map(item => String(item.id) === String(id) ? { ...item, quantity: newQty } : item);
                } else if (itemToAdd) {
                    return [...prev, { ...itemToAdd, quantity: newQty }];
                }
                return prev;
            });
        }
    };

    const handleClearCartAndAdd = () => {
        const { item, newQuantity } = conflictModal;
        if (item) {
            // Ensure chef name is set from chef_id if not already set
            const itemWithChef = {
                ...item,
                chef: item.chef || (item.chef_id ? getChefNameById(item.chef_id) : 'مطبخ'),
                quantity: newQuantity
            };
            setCart([itemWithChef]);
        }
        setConflictModal({ isOpen: false, item: null, newQuantity: 0 });
    };

    const handleClearCart = () => {
        setCart([]);
        setIsClearCartModalOpen(false);
    };

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            conflictModal,
            isClearCartModalOpen,
            getChefNameById,
            openCart: () => setIsCartOpen(true),
            closeCart: () => setIsCartOpen(false),
            updateQuantity,
            handleClearCartAndAdd,
            handleClearCart,
            setConflictModal,
            setIsClearCartModalOpen,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
