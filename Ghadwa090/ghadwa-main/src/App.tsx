
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DataProvider, useData } from '@/application/context/DataContext';
import { CartProvider } from '@/application/context/CartContext';
import { MainLayout } from '@/presentation/layouts/MainLayout';
import { logger } from '@/infrastructure/logging/logger';

// Pages
import { Hero } from '@/presentation/features/home/Hero';
import { Features } from '@/presentation/features/home/Features';
import { WeeklyOffers } from '@/presentation/features/home/WeeklyOffers';
import { ChefsSection } from '@/presentation/features/home/ChefsSection';
import { BestSellers } from '@/presentation/features/home/BestSellers';
import { ChefsPromo } from '@/presentation/features/home/ChefsPromo';
import { CustomerFeedback } from '@/presentation/features/home/CustomerFeedback';
import { CareersSection } from '@/presentation/features/home/CareersSection';
import { AppComingSoon } from '@/presentation/features/home/AppComingSoon';
import { BlogSection } from '@/presentation/features/home/BlogSection';
import { DeliveryFeatures } from '@/presentation/features/home/DeliveryFeatures';
import { StickyCartSummary } from '@/presentation/features/cart/StickyCartSummary';
import { BoxesSection } from '@/presentation/features/home/BoxesSection';
import { HealthySection } from '@/presentation/features/home/HealthySection';
import { FrozenSection } from '@/presentation/features/home/FrozenSection';
import { FullMenu } from '@/presentation/features/home/FullMenu';
import { useCart } from '@/application/context/CartContext';

// Full Pages
import { BoxesPage } from '@/presentation/pages/BoxesPage';
import { HealthyPage } from '@/presentation/pages/HealthyPage';
import { FrozenPage } from '@/presentation/pages/FrozenPage';
import { OffersPage } from '@/presentation/pages/OffersPage';
import { MenuPage } from '@/presentation/pages/MenuPage';
import { AllChefsPage } from '@/presentation/pages/AllChefsPage';
import { ChefMenuPage } from '@/presentation/pages/ChefMenuPage';
import { CheckoutPage } from '@/presentation/pages/CheckoutPage';
// import { AllChefsPage } from '@/presentation/pages/AllChefsPage';
// import { FavoritesPage } from '@/presentation/pages/FavoritesPage';
// import { TrackOrderPage } from '@/presentation/pages/TrackOrderPage';
// import { FAQPage, TermsPage, PrivacyPage } from '@/presentation/pages/LegalPages';

// Home Component that consists of multiple sections
const HomePage = () => {
    const { offers, chefs, bestSellers, boxes, menuItems, frozenItems, healthyItems } = useData();
    const { updateQuantity, cart } = useCart(); // Refactor to useCart logic

    // TEMPORARY: Adapter for props based components until they are refactored
    const dummyNavigate = (page: string) => {
        window.location.href = page === 'home' ? '/' : `/${page}`;
    };

    return (
        <>
            <Hero onNavigate={dummyNavigate} onOpenMenu={() => { }} />
            <WeeklyOffers offers={offers} cart={cart} updateQuantity={updateQuantity} />
            <BestSellers cart={cart} updateQuantity={updateQuantity} chefs={chefs} bestSellers={bestSellers} />
            <BoxesSection boxes={boxes} cart={cart} updateQuantity={updateQuantity} chefs={chefs} />
            <HealthySection healthyItems={healthyItems} cart={cart} updateQuantity={updateQuantity} />
            <FrozenSection frozenItems={frozenItems} cart={cart} updateQuantity={updateQuantity} />
            <FullMenu menuItems={menuItems} cart={cart} updateQuantity={updateQuantity} chefs={chefs} />
            <ChefsSection onNavigate={dummyNavigate} onChefClick={(chef) => { window.location.href = `/chef/${chef.id}`; }} chefs={chefs} />

            {/* <CustomerFeedback /> */}
            {/* <CareersSection /> */}
            <AppComingSoon />
            {/* <BlogSection /> */}
            <StickyCartSummary cart={cart} onOpenCart={() => { }} />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: 'boxes', element: <BoxesPage /> },
            { path: 'healthy', element: <HealthyPage /> },
            { path: 'frozen', element: <FrozenPage /> },

            { path: 'offers', element: <OffersPage /> },
            { path: 'menu', element: <MenuPage /> },
            { path: 'all-chefs', element: <AllChefsPage /> },
            { path: 'chef/:id', element: <ChefMenuPage /> },
            // Add other routes here as we migrate them
            { path: 'checkout', element: <CheckoutPage /> },
        ]
    }
]);

const App = () => {
    return (
        <DataProvider>
            {/* We need access to chefs inside CartProvider, but CartProvider is inside DataProvider so we can use hooks if we split it differently.
                However, looking at CartContext, it expects `chefs` prop. We should probably update CartProvider to use useData() internally 
                OR create a wrapper. 
                
                Let's make a wrapper component that passes data.
            */}
            <AppWithProviders />
        </DataProvider>
    );
};

const AppWithProviders = () => {
    const { chefs } = useData();
    return (
        <CartProvider chefs={chefs}>
            <RouterProvider router={router} />
        </CartProvider>
    );
}

export default App;
