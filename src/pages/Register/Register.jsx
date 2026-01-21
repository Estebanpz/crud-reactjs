import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./Register.css";
import { registerWithEmailAndPassword } from "../../firebase/auth.firebase";
import { saveUserInfo } from "../../firebase/store.firebase";
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    storeName: "",
  });

  const [loading, setLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Verificar coincidencia de contraseñas en tiempo real
    if (name === "password" || name === "confirmPassword") {
      const pass1 = name === "password" ? value : formData.password;
      const pass2 =
        name === "confirmPassword" ? value : formData.confirmPassword;

      if (pass2) {
        setPasswordsMatch(pass1 === pass2);
      } else {
        setPasswordsMatch(null);
      }
    }
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Campo Vacío",
        text: "Por favor ingresa tu correo electrónico",
        confirmButtonColor: "#7c3aed",
        background: "#f9fafb",
        color: "#1f2937",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "❌ Correo Inválido",
        text: "Por favor ingresa un correo válido",
        confirmButtonColor: "#7c3aed",
        background: "#f9fafb",
        color: "#1f2937",
      });
      return false;
    }

    if (!formData.password.trim()) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Campo Vacío",
        text: "Por favor ingresa una contraseña",
        confirmButtonColor: "#7c3aed",
        background: "#f9fafb",
        color: "#1f2937",
      });
      return false;
    }

    if (formData.password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Contraseña Débil",
        text: "La contraseña debe tener al menos 6 caracteres",
        confirmButtonColor: "#7c3aed",
        background: "#f9fafb",
        color: "#1f2937",
      });
      return false;
    }

    if (!formData.confirmPassword.trim()) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Campo Vacío",
        text: "Por favor confirma tu contraseña",
        confirmButtonColor: "#7c3aed",
        background: "#f9fafb",
        color: "#1f2937",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "❌ Contraseñas No Coinciden",
        text: "Las contraseñas ingresadas no son iguales",
        confirmButtonColor: "#7c3aed",
        background: "#f9fafb",
        color: "#1f2937",
      });
      return false;
    }

    if (!formData.storeName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Campo Vacío",
        text: "Por favor ingresa el nombre de tu tienda",
        confirmButtonColor: "#7c3aed",
        background: "#f9fafb",
        color: "#1f2937",
      });
      return false;
    }

    if (formData.storeName.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Nombre Muy Corto",
        text: "El nombre de la tienda debe tener al menos 3 caracteres",
        confirmButtonColor: "#7c3aed",
        background: "#f9fafb",
        color: "#1f2937",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Registrar usuario con email y contraseña
      const userCredential = await registerWithEmailAndPassword(
        formData.email,
        formData.password,
      );
      const userId = userCredential.user.uid;

      // Guardar información del usuario en Firestore
      await saveUserInfo(userId, {
        email: formData.email,
        storeName: formData.storeName,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: userId,
      });

      Swal.fire({
        icon: "success",
        title: "✅ ¡Registro Exitoso!",
        text: `¡Bienvenido a ${formData.storeName}! Tu cuenta ha sido creada correctamente.`,
        confirmButtonColor: "#7c3aed",
        background: "#f9fafb",
        color: "#1f2937",
      }).then(() => {
        navigate("/dashboard");
      });

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        storeName: "",
      });
      setPasswordsMatch(null);
      setLoading(false);
    } catch (error) {
      let errorMessage = "Hubo un error al registrarse";

      if (error.message.includes("email-already-in-use")) {
        errorMessage = "Este correo ya está registrado";
      } else if (error.message.includes("weak-password")) {
        errorMessage = "La contraseña es muy débil";
      } else if (error.message.includes("invalid-email")) {
        errorMessage = "El correo no es válido";
      }

      Swal.fire({
        icon: "error",
        title: "❌ Error",
        text: errorMessage,
        confirmButtonColor: "#7c3aed",
        background: "#f9fafb",
        color: "#1f2937",
      });
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>🎉 Crea tu Cuenta</h1>
          <p>Únete a nuestra comunidad de emprendedores</p>
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
            <label className="form-label">🏪 Nombre de la Tienda</label>
            <input
              type="text"
              name="storeName"
              className="form-control-custom"
              placeholder="Mi Tienda Increíble"
              value={formData.storeName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">🔑 Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control-custom"
              placeholder="Crea una contraseña segura"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="password-requirements">
              💡 Mínimo 6 caracteres para una contraseña segura
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">🔐 Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control-custom"
              placeholder="Repite tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {passwordsMatch !== null && (
              <div
                className={`password-match-indicator show ${passwordsMatch ? "password-match" : "password-mismatch"}`}
              >
                {passwordsMatch
                  ? "✅ Las contraseñas coinciden"
                  : "❌ Las contraseñas no coinciden"}
              </div>
            )}
          </div>

          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? "⏳ Registrando..." : "🚀 Crear Cuenta"}
          </button>
        </form>

        <div className="divider">O</div>

        <div className="login-link">
          ¿Ya tienes cuenta? <a href="/login">🔓 Inicia sesión aquí</a>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            paddingTop: "20px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <a
            href="#forgot-password"
            style={{
              color: "var(--primary-color)",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            🔗 ¿Necesitas restablecer tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
}
