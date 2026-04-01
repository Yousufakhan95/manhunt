import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import FloatingShapes from '../components/FloatingShapes'
import './Waitlist.css'

const initialForm = {
  name: '',
  email: '',
  phoneNumber: '',
  studentNumber: '',
  gender: '',
  availability: '',
  two_factor_code: '',
}

function Waitlist() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | rejected
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    if (!form.name.trim()) return 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Valid email is required'
    if (!form.phoneNumber.trim())
      return 'Phone number is required'
    if (!form.studentNumber.trim() || isNaN(Number(form.studentNumber)))
      return 'Valid student number is required'
    if (!form.gender) return 'Gender is required'
    if (!form.availability) return 'Availability is required'
    if (
      !form.two_factor_code ||
      isNaN(Number(form.two_factor_code)) ||
      Number(form.two_factor_code) < 1000 ||
      Number(form.two_factor_code) > 9999
    )
      return 'Invite code is required (4-digit number)'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    const validationError = validate()
    if (validationError) {
      setErrorMsg(validationError)
      return
    }

    setStatus('submitting')

    const code = Number(form.two_factor_code)

    const { data: codeRows, error: codeError } = await supabase
      .from('2 factor check')
      .select('code')
      .eq('code', code)
      .limit(1)

    if (codeError || !codeRows || codeRows.length === 0) {
      setStatus('rejected')
      return
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phoneNumber: form.phoneNumber.trim(),
      studentNumber: Number(form.studentNumber),
      gender: form.gender,
      availability: form.availability,
      two_factor_code: code,
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([payload])

    if (error) {
      setStatus('idle')
      if (error.message?.includes('duplicate') || error.code === '23505') {
        setErrorMsg('This email is already on the waitlist!')
      } else {
        setErrorMsg(error.message || 'Something went wrong. Try again.')
      }
      return
    }

    setStatus('success')
  }

  return (
    <div className="waitlist-page">
      <FloatingShapes />

      <div className="waitlist-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          &larr; Back
        </button>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              className="success-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="success-emoji">🎉</div>
              <h2>You're on the list!</h2>
              <p>
                We'll reach out before April 21st with all the details. Get
                ready to run.
              </p>
              <button className="cta-button" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </motion.div>
          ) : status === 'rejected' ? (
            <motion.div
              key="rejected"
              className="rejected-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="rejected-emoji">😔</div>
              <h2>Sorry, you're not invited yet</h2>
              <p>
                That invite code wasn't recognized. You need a valid code from
                someone who's already in. Hit them up and try again!
              </p>
              <button
                className="cta-button"
                onClick={() => setStatus('idle')}
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="waitlist-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h1>Join the Waitlist</h1>
              <p className="form-subtitle">
                Fill out everything below to secure your spot.
              </p>

              <div className="field">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Jane Gryphon"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="e.g. 647-555-1234"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="studentNumber">Student Number *</label>
                <input
                  id="studentNumber"
                  name="studentNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 1234567"
                  value={form.studentNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="field">
                <label>Availability for April 21, 8–11 PM? *</label>
                <div className="radio-group">
                  {['yes', 'no', 'maybe'].map((opt) => (
                    <label key={opt} className="radio-label">
                      <input
                        type="radio"
                        name="availability"
                        value={opt}
                        checked={form.availability === opt}
                        onChange={handleChange}
                        required
                      />
                      <span className="radio-text">
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="field">
                <label htmlFor="two_factor_code">Invite Code *</label>
                <input
                  id="two_factor_code"
                  name="two_factor_code"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="4-digit code"
                  value={form.two_factor_code}
                  onChange={handleChange}
                  required
                />
                <span className="field-hint">
                  Enter the 4-digit code given to you by the person who invited
                  you
                </span>
              </div>

              {errorMsg && (
                <motion.div
                  className="error-msg"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errorMsg}
                </motion.div>
              )}

              <button
                type="submit"
                className="cta-button submit-btn"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <span className="spinner" />
                ) : (
                  'Submit'
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Waitlist
