import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Navbar } from "../components/navBar/navBar.jsx";
import { useNavigation } from "react-router-dom";
import LoadingPage from "../common/LoadingPage.jsx";
import { Footer } from "../components/footer/footer.jsx";
import { SearchProvider } from "../contexts/SearchContext.jsx";

export const EcommerceLayout = () => {
    const navigation = useNavigation();

    return (
        <SearchProvider>
            <Navbar />
            <Suspense fallback={<LoadingPage />}>
                <Outlet />
            </Suspense>
            <Footer />
        </SearchProvider>
    );
}