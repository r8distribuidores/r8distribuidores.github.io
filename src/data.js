// =====================================================
// DATOS DEL NEGOCIO: aquí se edita todo el contenido
// =====================================================

export const business = {
  name: 'R8 Distribuidores',
  whatsapp: '51971380158', // código de país + número, sin + ni espacios
  email: 'r8distribuidores@hotmail.com',
  zone: 'Delivery. El costo depende de la distancia',
  hours: 'Atención por WhatsApp las 24 horas',
  // Contador de visitas: crea tu cuenta gratis en goatcounter.com y pon aquí tu código
  // (lo que va antes de .goatcounter.com). Déjalo vacío '' para ocultar el contador.
  goatcounter: '',
}

// Crea el enlace de WhatsApp con el mensaje ya escrito
export const waLink = (text) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`

// La lista de productos del catálogo está en src/inventory.js

export const reasons = [
  { title: 'Trato directo', text: 'Hablas con quien te atiende, sin intermediarios.' },
  { title: 'Respuesta rápida', text: 'Cotizamos y confirmamos disponibilidad por WhatsApp.' },
  { title: 'Entrega coordinada', text: 'Enviamos por delivery; el costo depende de la distancia.' },
 
]

export const steps = [
  { title: 'Escríbenos', text: 'Cuéntanos qué producto necesitas y la cantidad aproximada.' },
  { title: 'Recibe tu cotización', text: 'Te enviamos precio y disponibilidad.' },
  { title: 'Confirma y recibe', text: 'Coordinamos el pago y te lo llevamos por delivery.' },
]

// Carrusel de la portada. Para usar fotos propias, reemplaza los archivos de
// public/carrusel/ (puedes usar .jpg: cambia también el nombre en "image").
// "category" es la categoría del catálogo que se abre con "Ver productos".
export const slides = [
  {
    tag: 'Insumos químicos',
    title: 'Activos y materias primas de alta calidad',
    text: 'Principios activos, ácidos, vitaminas y excipientes para farmacia y cosmética.',
    image: 'carrusel/insumos-quimicos.svg',
    alt: 'Matraces y frascos de laboratorio con insumos químicos',
    category: 'Activos farmacéuticos y cosméticos',
    tone: 'blue',
  },
  {
    tag: 'Preparados magistrales',
    title: 'Todo para tus fórmulas magistrales',
    text: 'Bases, emulsionantes, ceras y excipientes para cremas, cápsulas y geles.',
    image: 'carrusel/preparados-magistrales.svg',
    alt: 'Mortero, cápsulas y potes de crema para preparados magistrales',
    category: 'Excipientes',
    tone: 'red',
  },
  {
    tag: 'Material médico',
    title: 'Material para consultorios ecográficos',
    text: 'Guantes, gel y papel para ecografía, papel sabanilla y más.',
    image: 'carrusel/material-medico.svg',
    alt: 'Guantes, gel para ecografía y rollo de papel térmico',
    category: 'Material médico',
    tone: 'deep',
  },
]
