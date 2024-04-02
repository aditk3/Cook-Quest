import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import SettingsPage from './SettingsPage';
import SettingsPage from '../screens/SettingsPage'

describe('SettingsPage', () => {
  it('should render the subscription preferences dropdown', () => {
    const { getByText } = render(<SettingsPage />);
    expect(getByText('Subscription Preferences')).toBeInTheDocument();
  });

  it('should show the selected preference when a user selects a preference', () => {
    const { getByText, getByRole } = render(<SettingsPage />);
    const preferenceDropdown = getByRole('button', { name: "--" }); //default preference
    fireEvent.click(preferenceDropdown);

    let preferenceOption = getByText(/cook quest pro/i);
    fireEvent.click(preferenceOption);
    expect(preferenceDropdown).toHaveTextContent(/cook quest pro/i);

    fireEvent.click(preferenceDropdown);
    preferenceOption = getByText(/cook quest business/i);
    fireEvent.click(preferenceOption);
    expect(preferenceDropdown).toHaveTextContent(/cook quest business/i);

    fireEvent.click(preferenceDropdown);
    preferenceOption = getByText(/cook quest standard/i);
    fireEvent.click(preferenceOption);
    expect(preferenceDropdown).toHaveTextContent(/cook quest standard/i);

  });

  it('should render the email subscription preferences checkboxes', () => {
    const { getByText, getByLabelText } = render(<SettingsPage />);
    expect(getByText('Email Subscription Preferences')).toBeInTheDocument();
    expect(getByLabelText('Daily Tips')).toBeInTheDocument();
    expect(getByLabelText('Weekly Chef Specials')).toBeInTheDocument();
    expect(getByLabelText('Monthly Newsletter')).toBeInTheDocument();
    expect(getByLabelText('Unsubscribe from all marketing emails')).toBeInTheDocument();
  });

});
