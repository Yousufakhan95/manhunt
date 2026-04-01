import { motion } from 'framer-motion'
import './FloatingShapes.css'

const shapes = [
  { size: 260, x: '10%', y: '15%', color: 'var(--pastel-pink)', delay: 0 },
  { size: 200, x: '75%', y: '10%', color: 'var(--pastel-blue)', delay: 1 },
  { size: 180, x: '85%', y: '55%', color: 'var(--pastel-yellow)', delay: 2 },
  { size: 140, x: '5%', y: '65%', color: 'var(--pastel-green)', delay: 0.5 },
  { size: 120, x: '50%', y: '80%', color: 'var(--pastel-purple)', delay: 1.5 },
  { size: 100, x: '35%', y: '5%', color: 'var(--pastel-orange)', delay: 0.8 },
  { size: 90, x: '60%', y: '40%', color: 'var(--pastel-pink)', delay: 2.2 },
  { size: 70, x: '20%', y: '85%', color: 'var(--pastel-blue)', delay: 1.2 },
]

function FloatingShapes() {
  return (
    <div className="floating-shapes" aria-hidden="true">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="shape"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            background: s.color,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, 0, -10, 0],
            scale: [1, 1.05, 1, 0.97, 1],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: s.delay,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingShapes
