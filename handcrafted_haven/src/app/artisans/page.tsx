import FeaturedArtisans from "@/components/featuredArtisans";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default async function Home() {
    return(
        <>
        <Header/>
        <h1>Artisans page</h1>
        <FeaturedArtisans/>
        <Footer/>
        </>
      

    )
}