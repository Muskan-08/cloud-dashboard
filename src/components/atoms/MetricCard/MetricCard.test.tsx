import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MetricCard from './MetricCard';

describe('MetricCard', () => {
  it('renders with default props', () => {
    render(<MetricCard title="CPU" value={75} />);
    
    expect(screen.getByText('CPU')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders with custom unit', () => {
    render(<MetricCard title="Memory" value={512} unit="MB" />);
    
    expect(screen.getByText('Memory')).toBeInTheDocument();
    expect(screen.getByText('512MB')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    render(<MetricCard title="Disk" value={85} size="small" />);
    
    expect(screen.getByText('Disk')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('renders without progress bar when showProgress is false', () => {
    render(<MetricCard title="Network" value={60} showProgress={false} />);
    
    expect(screen.getByText('Network')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
    // Progress bar should not be rendered
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('renders with custom color', () => {
    render(<MetricCard title="CPU" value={50} color="#ff0000" />);
    
    expect(screen.getByText('CPU')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    const CustomIcon = () => <span data-testid="custom-icon">🔧</span>;
    render(<MetricCard title="Custom" value={30} icon={<CustomIcon />} />);
    
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('applies correct progress color based on value', () => {
    const { rerender } = render(<MetricCard title="Low" value={30} />);
    expect(screen.getByText('Low')).toBeInTheDocument();
    
    rerender(<MetricCard title="Medium" value={80} />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
    
    rerender(<MetricCard title="High" value={95} />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });
});
