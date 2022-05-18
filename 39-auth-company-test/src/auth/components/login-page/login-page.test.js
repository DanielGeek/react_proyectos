import React from 'react';
import { screen, render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import {setupServer} from 'msw/node'

import { LoginPage } from './login-page';
import { handlers } from '../../../mocks/handlers';

const passwordValidationMessage =
  'The password must contain at least 8 characters, one upper case letter, one number and one special character'

const getPasswordInput = () => screen.getByLabelText(/password/i)

const getSendButton = () => screen.getByRole('button', {name: /send/i})

const fillInputsWithValidValues = () => {
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: {value: 'john.doe@test.com'},
  })
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: {value: 'Aa123456789!@#'},
  })
}

const server = setupServer(...handlers)

// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => render(<LoginPage />))

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

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
  it('display required messages as the format: “The [field name] is required”', async() => {
    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument()

    fireEvent.click(getSendButton())

    expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required/i)).toBeInTheDocument()

    await waitFor(() => expect(getSendButton()).not.toBeDisabled())
  })
})

describe('when the user fills the fields and clicks the submit button', () => {
  it('must not display the required messages', () => {
    fillInputsWithValidValues()

    fireEvent.click(getSendButton())

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

describe('when the user fills and blur the password input with a value with 7 character length', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    const passwordSevenLengthVal = 'asdfghj'

    fireEvent.change(getPasswordInput(), {
      target: {value: passwordSevenLengthVal},
    })
    fireEvent.blur(getPasswordInput())

    expect(screen.getByText(passwordValidationMessage)).toBeInTheDocument()
  })
})

describe('when the user fills and blur the password input with a value without one upper case character', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    const passwordWithoutUpperCaseVal = 'asdfghj8'

    fireEvent.change(getPasswordInput(), {
      target: {value: passwordWithoutUpperCaseVal},
    })
    fireEvent.blur(getPasswordInput())

    expect(screen.getByText(passwordValidationMessage)).toBeInTheDocument()
  })
})

describe('when the user fills and blur the password input with a value without one number', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    const passwordWithoutNumb = 'asdfghjA'

    fireEvent.change(getPasswordInput(), {
      target: {value: passwordWithoutNumb},
    })
    fireEvent.blur(getPasswordInput())

    expect(screen.getByText(passwordValidationMessage)).toBeInTheDocument()
  })
})

describe('when the user fills and blur the password input with a value without one special character', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    const passwordWithoutSpecialChar = 'asdfghjA1a'

    fireEvent.change(getPasswordInput(), {
      target: {value: passwordWithoutSpecialChar},
    })
    fireEvent.blur(getPasswordInput())

    expect(screen.getByText(passwordValidationMessage)).toBeInTheDocument()
  })
})

describe(`when the user fills and blur the password input with without one special character and
then change with valid value and blur again`, () => {
  it(`must not display the validation message`, () => {
    const passwordWithoutSpecialChar = 'asdfghjA1a'
    const validPassword = 'aA1asdasda#'

    fireEvent.change(getPasswordInput(), {
      target: {value: passwordWithoutSpecialChar},
    })
    fireEvent.blur(getPasswordInput())

    expect(screen.getByText(passwordValidationMessage)).toBeInTheDocument()

    fireEvent.change(getPasswordInput(), {
      target: {value: validPassword},
    })
    fireEvent.blur(getPasswordInput())

    expect(
      screen.queryByText(passwordValidationMessage),
    ).not.toBeInTheDocument()
  })
})

describe('when the user submit the login form with valid data', () => {
  it('must disable the submit button while the form page is fetching the data', async () => {
    fillInputsWithValidValues()

    fireEvent.click(getSendButton())

    expect(getSendButton()).toBeDisabled()

    await waitFor(() => expect(getSendButton()).not.toBeDisabled())
  })

  it('must be a loading indicator at the top of the form while it is fetching', async() => {
    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument()

    fillInputsWithValidValues()

    fireEvent.click(getSendButton())

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-indicator'))
  })
})