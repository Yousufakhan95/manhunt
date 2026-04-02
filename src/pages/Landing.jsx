import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import FloatingShapes from '../components/FloatingShapes'
import './Landing.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
}

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <FloatingShapes />

      <div className="landing-content">
        <motion.div
          className="badge"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          INVITE ONLY
        </motion.div>

        <motion.h1
          className="hero-title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <span className="highlight">&lt;50</span> Player
          <br />
          Tech-Induced Manhunt
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          A modern, tech-powered manhunt across the University of Guelph.
          <br className="desktop-break" />
          Phones. Live zones. Real-time hints. One campus. No hiding.
        </motion.p>

        <motion.div
          className="disclaimer-badge"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2.5}
        >
          Not a formally organized event &mdash; still in the planning stage. We're
          gauging interest to see if we actually host this.
        </motion.div>

        <motion.div
          className="info-cards"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <div className="info-card">
            <span className="info-icon">📍</span>
            <div>
              <strong>University of Guelph</strong>
              <p>Campus-wide</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">📅</span>
            <div>
              <strong>April 21, 2026</strong>
              <p>Last day of exams</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">🕗</span>
            <div>
              <strong>8 PM &ndash; 11 PM</strong>
              <p>3 hours of chaos</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="cta-section"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <button className="cta-button" onClick={() => navigate('/join')}>
            Join the Waitlist
            <span className="arrow">&rarr;</span>
          </button>
          <p className="cta-hint">Spots are limited &mdash; don't miss out</p>
        </motion.div>

        <motion.div
          className="how-it-works"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Get Invited</h3>
              <p>Receive your invite code from the organizers</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Sign Up</h3>
              <p>Join the waitlist with your details and code</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Show Up</h3>
              <p>April 21st, 8 PM. The hunt begins.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="tech-section"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          <h2>Not Your Average Manhunt</h2>
          <p className="tech-subtitle">
            This isn't just running around in the dark. We built a system.
          </p>
          <div className="tech-cards">
            <div className="tech-card">
              <span className="tech-card-icon">📱</span>
              <h3>Phone-Powered</h3>
              <p>
                Everything runs through your phone. Live updates, your team
                status, and alerts &mdash; all in real time.
              </p>
            </div>
            <div className="tech-card">
              <span className="tech-card-icon">🗺️</span>
              <h3>Live Zones</h3>
              <p>
                The map shrinks. Safe zones shift. Stay in bounds or get
                eliminated &mdash; you'll get pinged when zones change.
              </p>
            </div>
            <div className="tech-card">
              <span className="tech-card-icon">💡</span>
              <h3>Real-Time Hints</h3>
              <p>
                Hunters get proximity hints and clues pushed straight to their
                screens. Runners get head-start warnings.
              </p>
            </div>
            <div className="tech-card">
              <span className="tech-card-icon">⚡</span>
              <h3>Instant Eliminations</h3>
              <p>
                Tagged out? It's logged instantly. Live leaderboard tracks
                who's still in and who's been caught.
              </p>
            </div>
          </div>
        </motion.div>

        <footer className="landing-footer">
          <p>UofG Manhunt 2026 &middot; Not affiliated with the University of Guelph</p>
        </footer>
      </div>
    </div>
  )
}

export default Landing
