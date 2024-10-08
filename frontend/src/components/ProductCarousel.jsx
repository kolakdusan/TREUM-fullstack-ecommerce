import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'
import { useGetTopProductsQuery } from '../slices/productsApiSlice'

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery()

  return isLoading ? (
    <></>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Carousel pause={false} className="bg-primary mb-4">
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="carousel-image"
              />
              <div className="carousel-description">
                <p className="carousel-description-text">
                  {product.description}
                </p>
              </div>
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}
export default ProductCarousel
