import React from 'react';
import  Welcome  from "./Welcome";
import { render, screen } from "@testing-library/react";

test(`component mounted correctly`, () => {
  render(<Welcome />);
  const welcomeElement = screen.queryByTestId(`welcome_element`);
  expect(welcomeElement).toBeInTheDocument();
});
