import axios from "axios";

import { render, screen } from '@testing-library/react';
import Users from '../pages/users';
import '@testing-library/jest-dom';

describe("<App />", () => {
  it("Renders <Users /> component", () => {
    render(<Users />);

    expect(axios.get).toHaveBeenCalledTimes(1);
    data.data.forEach((el) => {
      expect(screen.getByText(el.id)).toBeInTheDocument();
    });
  });
});