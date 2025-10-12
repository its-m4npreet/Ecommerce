// ...existing code from EcommerceLayout.jsx will be moved here...
import { Outlet } from "react-router-dom";
import  {Navbar}  from "../components/navBar/navBar.jsx";
import { useNavigation } from "react-router-dom";
import LoadingPage from "../common/LoadingPage.jsx";
import { Footer } from "../components/footer/footer.jsx";
import { SearchProvider } from "../contexts/SearchContext.jsx";

export const EcommerceLayout=()=>{
    const navigation = useNavigation();
    // console.log(navigation);
              if(navigation.state==="loading"){
                // console.log("Navigation:", navigation.state);
                  return <LoadingPage />
              }
            // console.log("Navigation state:", navigation.state);
           return (
        <SearchProvider>
            <Navbar />
            <Outlet />
            <Footer />
        </SearchProvider>
    );

              }