import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Web Developer",
    content: "SkillBoost helped me transition from a beginner to a confident web developer. The personalized learning path was a game-changer!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    name: "John Smith",
    role: "Data Scientist",
    content: "The AI-powered recommendations led me to discover skills I never knew I needed. Now, I'm excelling in my data science career!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "UX Designer",
    content: "SkillBoost's interactive lessons and projects helped me build a strong portfolio. I landed my dream job thanks to the skills I gained here!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  }
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [containerHeight, setContainerHeight] = useState("auto")
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      setContainerHeight(contentRef.current.offsetHeight)
    }
  }, [currentIndex])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      position: 'relative'
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute'
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm">
        <div style={{ height: containerHeight }} className="relative transition-height duration-300">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              ref={contentRef}
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="w-full p-8 md:p-12"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative mb-6"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-xl">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2 shadow-lg"
                  >
                    <FaQuoteLeft className="text-white text-sm" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-2xl"
                >
                  <p className="text-xl md:text-2xl text-gray-700 font-inter leading-relaxed mb-6">
                    "{testimonials[currentIndex].content}"
                  </p>
                  
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <FaStar className="text-yellow-400 text-xl" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold font-poppins gradient-text">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-gray-600 font-inter">
                      {testimonials[currentIndex].role}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm text-blue-600 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-10"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft className="text-xl" />
        </motion.button>
        <motion.button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm text-blue-600 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-10"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight className="text-xl" />
        </motion.button>

        {/* Dots Navigation */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-blue-600' : 'bg-blue-200'
              }`}
              onClick={() => {
                const direction = index - currentIndex
                setDirection(direction)
                setCurrentIndex(index)
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}