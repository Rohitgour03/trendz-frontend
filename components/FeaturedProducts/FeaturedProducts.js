import TshirtCard from '../TshirtCard/TshirtCard'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1280 },
        items: 4,
        slidesToSlide: 4,
    },
    miniDesktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 668 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 668, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 50
    }
  };

export default function featuredProducts(props){

    const products =  props.pdts.map(item => {
        const url = item.attributes.img.data.attributes.url
        return (
                <TshirtCard 
                    key={item.id} 
                    imgSrc={url}
                    url={url}
                />
        )
    })

    return (
        <section className='my-10 md:pb-20'>
            <h2 className='font-bold text-4xl my-8 text-center'>{props.type}</h2>
            <div className=''>
                <Carousel 
                    responsive={responsive}
                    ssr={true}
                    swipeable={true}
                    draggable={true}
                    keyBoardControl={true}
                    partialVisible={true}   
                >
                    { products }
                </Carousel>
            </div>
        </section>
    )
}