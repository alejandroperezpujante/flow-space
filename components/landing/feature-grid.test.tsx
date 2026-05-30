import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FeatureGrid } from './feature-grid'

describe('FeatureGrid snapshot', () => {
  it('renders consistently', () => {
    const { asFragment } = render(<FeatureGrid />)
    expect(asFragment()).toMatchSnapshot()
  })
})
