import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MagicMouse from './MagicMouse'

describe('<MagicMouse/>', () => {
  test('Magic Mouse Mounted', () => {
    const wrapper = render(<MagicMouse />)
    expect(wrapper).toBeTruthy()

    const cursor = wrapper.container.querySelector('.cursor') as HTMLDivElement
    expect(cursor).toBeTruthy()

    const outline = wrapper.container.querySelector(
      '.outline'
    ) as HTMLDivElement
    expect(outline).toBeTruthy()
  })
})
