import AboutUs from "@/components/aboutUs";
import Footer from "@/components/footer";
import Header from "@/components/header";


export default async function Page() {
    return(
        <>
        <Header/>
        <h1>About Us page</h1>
        <AboutUs/>
        <Footer/>
        </>
    )
}