import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ value, text }) => {
  const numOfFullStars = Array.from({ length: Math.floor(value) })

  const numOfHalfStars = Array.from({
    length: value - Math.floor(value) === 0 ? 0 : 1,
  })

  const numOfEmptyStars = Array.from({
    length: 5 - numOfFullStars.length - numOfHalfStars.length,
  })

  return (
    <div className="rating">
      {numOfFullStars.map((_, i) => (
        <span key={`full-${i}`}>
          <FaStar />
        </span>
      ))}

      {numOfHalfStars.map((_, i) => (
        <span key={`half-${i}`}>
          <FaStarHalfAlt />
        </span>
      ))}

      {numOfEmptyStars.map((_, i) => (
        <span key={`empty-${i}`}>
          <FaRegStar />
        </span>
      ))}

      {text && <span className="rating-text">{text}</span>}
    </div>
  )
}
export default Rating
