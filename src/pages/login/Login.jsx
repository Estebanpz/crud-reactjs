import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import './Login.css'

import { loginWithEmailAndPassword } from '../../firebase/auth.firebase'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      Swal.fire({
        icon: 'warning',
        title: '⚠️ Campo Vacío',
        text: 'Por favor ingresa tu correo electrónico',
        confirmButtonColor: '#7c3aed',
        background: '#f9fafb',
        color: '#1f2937'
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: '❌ Correo Inválido',
        text: 'Por favor ingresa un correo válido',
        confirmButtonColor: '#7c3aed',
        background: '#f9fafb',
        color: '#1f2937'
      })
      return false
    }

    if (!formData.password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: '⚠️ Campo Vacío',
        text: 'Por favor ingresa tu contraseña',
        confirmButtonColor: '#7c3aed',
        background: '#f9fafb',
        color: '#1f2937'
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Iniciar sesión con email y contraseña
      await loginWithEmailAndPassword(formData.email, formData.password)

      Swal.fire({
        icon: 'success',
        title: '✅ ¡Bienvenido!',
        text: `Hola, te has autenticado correctamente`,
        confirmButtonColor: '#7c3aed',
        background: '#f9fafb',
        color: '#1f2937'
      }).then(() => {
        navigate('/dashboard')
      })

      setFormData({ email: '', password: '' })
      setLoading(false)
    } catch (error) {
      let errorMessage = 'Hubo un error al iniciar sesión'

      if (error.message.includes('user-not-found')) {
        errorMessage = 'El usuario no existe'
      } else if (error.message.includes('wrong-password')) {
        errorMessage = 'Contraseña incorrecta'
      } else if (error.message.includes('invalid-email')) {
        errorMessage = 'El correo no es válido'
      } else if (error.message.includes('user-disabled')) {
        errorMessage = 'El usuario ha sido deshabilitado'
      }

      Swal.fire({
        icon: 'error',
        title: '❌ Error',
        text: errorMessage,
        confirmButtonColor: '#7c3aed',
        background: '#f9fafb',
        color: '#1f2937'
      })
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 Inicia Sesión</h1>
          <p>Accede a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">📧 Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control-custom"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">🔑 Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control-custom"
              placeholder="Tu contraseña segura"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="forgot-password">
            <a href="#forgot-password">🔗 ¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading ? '⏳ Iniciando sesión...' : '🚀 Inicia Sesión'}
          </button>
        </form>

        <div className="divider">O</div>

        <div className="signup-link">
          ¿No tienes cuenta? <a href="/register">📝 Regístrate aquí</a>
        </div>
      </div>
    </div>
  )
}
