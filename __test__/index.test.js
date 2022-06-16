import axios from "axios";

import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/index';
import '@testing-library/jest-dom';

describe("<App />", () => {
  it("Renders <Dashboard /> component", () => {
    render(<Dashboard />);

    expect(axios.get).toHaveBeenCalledTimes(1);
    data.data.forEach((el) => {
      expect(screen.getByText(el.id)).toBeInTheDocument();
    });
  });
});