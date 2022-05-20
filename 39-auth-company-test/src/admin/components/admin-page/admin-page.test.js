import React from 'react';
import {render, screen} from '@testing-library/react';

import {AdminPage} from './admin-page'

describe('When the admin page is mounted', () => {
  it('must display the admin username', () => {
    render(<AdminPage />)

    screen.getByText(/john doe/i).toBeInTheDocumente()
  })
})