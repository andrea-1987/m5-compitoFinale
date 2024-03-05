// import { MyCard } from "./MyCard";
// import React from "react";
// import { MemoryRouter } from "react-router-dom";
// import{ fireEvent, render, screen} from "@testing-library/react"

// test ( `card borderd in red onclick`, ()=>{
//     render(<MemoryRouter>
//         <MyCard />
//       </MemoryRouter>)
//     const cardElement=screen.queryByTestId(`card_element`)
//     expect(cardElement).toBeInTheDocument();
//     fireEvent.click(cardElement)
//     expect(cardElement).toHaveStyle(`border:3px solid red`)
// })

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MyCard } from "./MyCard";

test(`card bordered in red onclick`, async () => {
  const mockBook = {
    asin: "someAsinValue",
    img: "someImageUrl",
  };

  render(
    <MemoryRouter>
      <MyCard
        setSelected={() => {}}
        selected={null}
        book={{
          asin: "someAsinValue",
          img: "someImageUrl",
          title: "Some Book Title",
        }}
      />
    </MemoryRouter>
  );

   await waitFor(() => {
    const cardElement = screen.getByTestId(`card_element`);
    expect(cardElement).toBeInTheDocument();
  });

  const cardElement = screen.getByTestId(`card_element`);

  fireEvent.click(cardElement);
  
   await waitFor(() => {
    expect(cardElement).toHaveStyle(`border: 3px solid red`);
  });
});

