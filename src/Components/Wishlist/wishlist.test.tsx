import { render, screen, cleanup } from "@testing-library/react";
import { SetStateAction } from "react";
import { Provider } from "react-redux";
import { store } from "./../../app/store";
import City from "./City";
import Wishlist from "./wishlist";

test("testing carousel", async () => {
    
    render(
      <Provider store={store}>
        <Wishlist />
      </Provider>
    );
  
    const wishlist = screen.getByTestId("wishlist");
    // const city = screen.getByTestId("city");
  
    expect(wishlist).toBeInTheDocument();
  
    
  });

  test("testing city rendering", async () => {
    
    render(
      <Provider store={store}>
        <City cityName={""} key={0} />
      </Provider>
    );
  
    const city = screen.getByTestId("city");
  
    expect(city).toBeInTheDocument();
  
    
  });