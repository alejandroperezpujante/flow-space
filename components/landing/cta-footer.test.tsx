import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CtaFooter } from './cta-footer'

describe('CtaFooter snapshot', () => {
  it('renders consistently', () => {
    const { asFragment } = render(<CtaFooter />)
    expect(asFragment()).toMatchSnapshot()
  })
})
