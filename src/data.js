// =====================================================
// DATOS DEL NEGOCIO: aquí se edita todo el contenido
// =====================================================

export const business = {
  name: 'R8 Distribuidores',
  whatsapp: '51971380158', // código de país + número, sin + ni espacios
  email: 'r8distribuidores@hotmail.com',
  zone: 'Delivery. El costo depende de la distancia',
  hours: 'Atención por WhatsApp las 24 horas',
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
