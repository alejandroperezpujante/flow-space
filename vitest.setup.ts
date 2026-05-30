import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom doesn't implement matchMedia; stub it so lib/theme.tsx doesn't throw
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// @dnd-kit requires ResizeObserver — must be a constructable class, not an arrow fn
global.ResizeObserver = class {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
} as unknown as typeof ResizeObserver

// @dnd-kit keyboard sensor uses scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

// React 19 / applyTheme uses requestAnimationFrame
global.requestAnimationFrame = (cb: FrameRequestCallback) =>
  setTimeout(cb, 0) as unknown as number
global.cancelAnimationFrame = (id: number) => clearTimeout(id)
