import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/StoreContext'
import { logOut } from '../firebase/auth.firebase'
import Swal from 'sweetalert2'
import './Sidebar.css'

export default function Sidebar() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const {store} = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        icon: 'question',
        title: '¿Cerrar sesión?',
        text: '¿Estás seguro de que deseas cerrar sesión?',
        confirmButtonColor: '#7c3aed',
        cancelButtonColor: '#ef4444',
        background: '#f9fafb',
        color: '#1f2937',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
      })

      if (result.isConfirmed) {
        await logOut()
        navigate('/login')
        Swal.fire({
          icon: 'success',
          title: '✅ Sesión Cerrada',
          text: 'Has cerrado sesión correctamente',
          confirmButtonColor: '#7c3aed',
          background: '#f9fafb',
          color: '#1f2937'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '❌ Error',
        text: 'Hubo un error al cerrar sesión',
        confirmButtonColor: '#7c3aed',
        background: '#f9fafb',
        color: '#1f2937'
      })
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

    {/* Sidebar */}
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2 className='text-center flex-grow-1'>🏪 {store?.storeName}</h2>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
            ✕
            </button>
          </div>

          <nav className="sidebar-nav">
            <ul className="nav-list">
            <li>
              <button
                className="nav-item"
                onClick={() => {
                  navigate('/dashboard')
                  setIsOpen(false)
                }}
              >
                <span className="icon">📦</span>
                <span className="label">Products</span>
              </button>
            </li>

            <li>
              <button
                className="nav-item"
                onClick={() => {
                  navigate('/dashboard/categorias')
                  setIsOpen(false)
                }}
              >
                <span className="icon">📂</span>
                <span className="label">Categories</span>
              </button>
            </li>

            <li>
              <button
                className="nav-item"
                onClick={() => {
                  navigate('/dashboard/configuracion')
                  setIsOpen(false)
                }}
              >
                <span className="icon">⚙️</span>
                <span className="label">Settings</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-email">👤 {store?.storeName}</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <span className="icon">🚪</span>
            <span className="label">Sign out</span>
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  )
}
