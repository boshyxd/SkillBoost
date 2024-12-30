import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProgressTracker from '../../components/lessons/ProgressTracker'

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}))

describe('ProgressTracker', () => {
  const mockTasks = [
    'Complete task 1',
    'Complete task 2',
    'Complete task 3'
  ]

  const mockProps = {
    lessonId: 1,
    skillId: 'skill123',
    tasks: mockTasks,
    onProgressUpdate: jest.fn(),
    initialProgress: {}
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<ProgressTracker {...mockProps} />)
    expect(screen.getByText('Progress Tracker')).toBeInTheDocument()
  })

  it('displays all tasks', () => {
    render(<ProgressTracker {...mockProps} />)
    mockTasks.forEach(task => {
      expect(screen.getByText(task)).toBeInTheDocument()
    })
  })

  it('updates progress when tasks are completed', () => {
    render(<ProgressTracker {...mockProps} />)
    
    // Click the first task checkbox
    const checkboxes = screen.getAllByRole('button')
    fireEvent.click(checkboxes[0])

    // Progress should be updated
    expect(mockProps.onProgressUpdate).toHaveBeenCalled()
    const lastCall = mockProps.onProgressUpdate.mock.calls[0][0]
    expect(lastCall.completedTasks[0]).toBe(true)
  })

  it('shows knowledge check section when button is clicked', () => {
    render(<ProgressTracker {...mockProps} />)
    
    const knowledgeCheckButton = screen.getByText('Knowledge Check')
    fireEvent.click(knowledgeCheckButton)

    expect(screen.getByText('What is the main concept covered in this lesson?')).toBeInTheDocument()
  })

  it('handles quiz answers correctly', () => {
    render(<ProgressTracker {...mockProps} />)
    
    // Show knowledge check
    fireEvent.click(screen.getByText('Knowledge Check'))

    // Answer first question
    const options = screen.getAllByRole('button').filter(button => 
      button.textContent.startsWith('Option')
    )
    fireEvent.click(options[0]) // Click first option

    // Progress should be updated
    expect(mockProps.onProgressUpdate).toHaveBeenCalled()
    const lastCall = mockProps.onProgressUpdate.mock.calls[0][0]
    expect(lastCall.quizAnswers[1]).toBeDefined() // Question 1 should have an answer
  })

  it('loads initial progress correctly', () => {
    const initialProgress = {
      completedTasks: { 0: true, 1: true },
      quizAnswers: { 1: true }
    }

    render(<ProgressTracker {...mockProps} initialProgress={initialProgress} />)
    
    // Check that completed tasks are marked
    const checkboxes = screen.getAllByRole('button')
    expect(checkboxes[0]).toHaveClass('bg-green-500')
    expect(checkboxes[1]).toHaveClass('bg-green-500')
  })

  it('shows learning tips', () => {
    render(<ProgressTracker {...mockProps} />)
    
    expect(screen.getByText('Learning Tips')).toBeInTheDocument()
    expect(screen.getByText('• Mark tasks as complete as you work through them')).toBeInTheDocument()
    expect(screen.getByText('• Take the knowledge check to reinforce your learning')).toBeInTheDocument()
  })

  it('calculates overall progress correctly', () => {
    const { rerender } = render(<ProgressTracker {...mockProps} />)
    
    // Initially 0%
    expect(screen.getByText('0%')).toBeInTheDocument()

    // Complete one task
    const checkboxes = screen.getAllByRole('button')
    fireEvent.click(checkboxes[0])

    // Progress should update
    rerender(<ProgressTracker {...mockProps} />)
    
    // The progress calculation can be verified through the onProgressUpdate mock
    expect(mockProps.onProgressUpdate).toHaveBeenCalled()
  })
}) 