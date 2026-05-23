let attached = false
let rafId = 0
let pendingX = 0
let pendingY = 0
let committedX = -1
let committedY = -1

const flush = () => {
  rafId = 0
  if (pendingX === committedX && pendingY === committedY) return

  committedX = pendingX
  committedY = pendingY

  const root = document.documentElement
  const w = window.innerWidth || 1
  const h = window.innerHeight || 1

  root.style.setProperty('--mouse-x', `${committedX}px`)
  root.style.setProperty('--mouse-y', `${committedY}px`)
  root.style.setProperty('--mouse-x-ratio', `${committedX / w}`)
  root.style.setProperty('--mouse-y-ratio', `${committedY / h}`)
}

const onMouseMove = (event: MouseEvent) => {
  pendingX = event.clientX
  pendingY = event.clientY
  if (rafId) return
  rafId = window.requestAnimationFrame(flush)
}

export const initMouseSpotlight = () => {
  if (attached || typeof window === 'undefined') return
  if (window.matchMedia('(pointer: coarse)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  pendingX = window.innerWidth / 2
  pendingY = window.innerHeight * 0.28
  committedX = -1
  committedY = -1
  flush()

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  attached = true
}

export const destroyMouseSpotlight = () => {
  if (!attached || typeof window === 'undefined') return

  window.removeEventListener('mousemove', onMouseMove)
  if (rafId) {
    window.cancelAnimationFrame(rafId)
    rafId = 0
  }
  attached = false
}
