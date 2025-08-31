import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusBadge from './StatusBadge';

describe('StatusBadge', () => {
  it('renders online status correctly', () => {
    render(<StatusBadge status="online" />);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('renders offline status correctly', () => {
    render(<StatusBadge status="offline" />);
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('renders maintenance status correctly', () => {
    render(<StatusBadge status="maintenance" />);
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
  });

  it('renders warning status correctly', () => {
    render(<StatusBadge status="warning" />);
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    render(<StatusBadge status="online" size="small" />);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('renders with default size', () => {
    render(<StatusBadge status="online" size="default" />);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });
});
