import React from 'react'
import { render, screen } from '@testing-library/react'
import Services from '../pages/service.jsx'

test('renders the Services page with main heading and key sections', () => {
  render(<Services />)

  // Checks main heading
  expect(screen.getByRole('heading', { name: /services/i })).toBeInTheDocument()

  // Spot check a few service offerings
  expect(screen.getByText(/Website Development/i)).toBeInTheDocument()
  expect(screen.getByText(/API Creation and Integration/i)).toBeInTheDocument()
  expect(screen.getByText(/Database Design and Management/i)).toBeInTheDocument()
  expect(screen.getByText(/User Interface and User Experience Improvements/i)).toBeInTheDocument()
  expect(screen.getByText(/Performance Optimization/i)).toBeInTheDocument()

  // Check that at least 9 list items are rendered
  const listItems = screen.getAllByRole('listitem')
  expect(listItems.length).toBeGreaterThanOrEqual(9)
})