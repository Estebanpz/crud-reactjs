# 🎨 Documentación de Estilos - CRUD ReactJS

## Paleta de Colores

Se ha implementado una paleta de colores moderna, elegante e intuitiva basada en morado, blanco y negro:

### Colores Principales
- **Primario (Morado)**: `#7c3aed` - Color principal para elementos interactivos
- **Secundario (Morado Claro)**: `#a78bfa` - Complemento del color primario
- **Acentuado (Rosa Pálida)**: `#d8b4fe` - Acentos y degradados
- **Oscuro (Negro)**: `#1f2937` - Texto principal
- **Claro (Blanco off)**: `#f9fafb` - Fondo principal
- **Blanco**: `#ffffff` - Fondo de tarjetas
- **Peligro (Rojo)**: `#ef4444` - Botones de eliminar
- **Éxito (Verde)**: `#10b981` - Confirmaciones

## Cambios Implementados

### 1. Bootstrap 5
- ✅ Instalado `bootstrap` y `react-bootstrap`
- ✅ Importado en `src/main.jsx`
- ✅ Sistema de grid responsive integrado

### 2. Estilos Globales (`src/index.css`)
- Paleta de colores CSS variables personalizada
- Tipografía moderna: 'Segoe UI'
- Estilos base para `body`, `html`, y `#root`
- Altura 100% para layout de pantalla completa

### 3. Estilos de Aplicación (`src/App.css`)
- Layout de flexbox con min-height 100vh
- Gradiente de fondo (light → light purple)
- Título con sombra de texto elegante
- Responsive con media queries

### 4. Estilos del Formulario (`src/components/ItemForm.css`)
- **Contenedor**: Tarjeta blanca con sombra y borde morado suave
- **Inputs**: Bordes morados con efecto focus
- **Botón**: Gradiente morado con hover effect
- **Responsive**: Adaptación completa en móviles

### 5. Estilos de Lista (`src/components/ItemList.css`)
- **Contenedor**: Tarjeta blanca con sombra elegante
- **Items**: Línea izquierda morada, fondo con gradiente suave
- **Animaciones**: Hover effects con transform
- **Botón eliminar**: Color rojo con transiciones suaves
- **Estado vacío**: Mensaje centrado con icono
- **Responsive**: Diseño adaptativo para todos los tamaños

## Características Destacadas

### 🎯 Diseño Moderno
- Gradientes suaves entre colores
- Sombras elegantes con blur
- Bordes redondeados (border-radius: 8-12px)
- Transiciones suaves (0.3s)

### 📱 Responsive
- Bootstrap Grid System (col-lg-4, col-lg-8)
- Media queries personalizadas
- Layouts adaptables para móviles, tablets y desktop

### ✨ Interactividad
- Hover effects en botones y tarjetas
- Transform animations (translateY, translateX)
- Focus states en inputs
- SweetAlert2 con colores personalizados

### ♿ Accesibilidad
- Colores con buen contraste
- Elementos interactivos claramente identificados
- Labels en formularios
- Mensajes de confirmación descriptivos

## Estructura de Carpetas CSS

```
src/
├── index.css           # Variables CSS globales y estilos base
├── App.css            # Estilos de la aplicación principal
└── components/
    ├── ItemForm.css   # Estilos del formulario
    └── ItemList.css   # Estilos de la lista
```

## Uso de Componentes Bootstrap

### En App.jsx
- `Container` - Contenedor responsivo
- Grid system (row, col-lg-4, col-lg-8)

### En ItemForm.jsx
- `Form` - Contenedor de formulario
- `Form.Group` - Agrupación de elementos
- `Form.Label` - Etiquetas
- `Form.Control` - Inputs estilizados
- `Button` - Botones Bootstrap

### En ItemList.jsx
- `Button` - Botones Bootstrap
- Integración con SweetAlert2

## Variables CSS Disponibles

```css
--primary-color: #7c3aed      /* Morado principal */
--secondary-color: #a78bfa    /* Morado claro */
--accent-color: #d8b4fe       /* Rosa pálida */
--dark-color: #1f2937         /* Negro */
--light-color: #f9fafb        /* Blanco off */
--white-color: #ffffff        /* Blanco */
--danger-color: #ef4444       /* Rojo */
--success-color: #10b981      /* Verde */
```

Utiliza estas variables en tus estilos personalizados: `background-color: var(--primary-color);`

## Compatibilidad

- Bootstrap 5+
- React 19+
- Todos los navegadores modernos (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
