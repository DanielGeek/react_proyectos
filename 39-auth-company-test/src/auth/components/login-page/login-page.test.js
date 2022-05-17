import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';

import { LoginPage } from './login-page';

// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => render(<LoginPage />))

describe('when login page is mounted', () => {
  it('must display the login title', () => {
    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })

  it('must have a form with the following fields: email, password and a submit button.', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    // eslint-disable-next-line jest/valid-expect
    expect(screen.getByRole('button', { name: /send/i }))
  })
})

describe('when the user leaves empty fields and clicks the submit button', () => {
  it('display required messages as the format: “The [field name] is required”', () => {
    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required/i)).toBeInTheDocument()
  })
})

describe('when the user fills the fields and clicks the submit button', () => {
  it('must not display the required messages', () => {
    screen.getByLabelText(/email/i).value = 'john.doe@test.com'
    screen.getByLabelText(/password/i).value = 'Aa123456789!@#'

    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument()
  })
})

describe('when the user fills and blur the email input with invalid email, and then focus and change with valid value', () => {
  it('must not display a validation message', () => {
    const emailInput = screen.getByLabelText(/email/i)

    // change and blur email input
    fireEvent.change(emailInput, { target: { value: 'invalid.email' } })
    fireEvent.blur(emailInput)
    // expect
    expect(screen.getByText(/the email is invalid. Example: john.doe@mail.com/i)).toBeInTheDocument()

    fireEvent.change(emailInput, { target: { value: 'john.doe@email.com' } })
    fireEvent.blur(emailInput)

    expect(screen.queryByText(/the email is invalid. Example: john.doe@mail.com/i)).not.toBeInTheDocument()
  })
})