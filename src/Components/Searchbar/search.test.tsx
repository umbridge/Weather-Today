import { render, screen, cleanup } from "@testing-library/react";
import { SetStateAction } from "react";
import { Provider } from "react-redux";
import { store } from "./../../app/store"
import Searchbar, {focused} from "./searchbar";
import Suggestions from "./ListRecentSearches";


test("testing search bar", async () => {
    
    render(
      <Provider store={store}>
        <Searchbar focusedsearchbar={false} setFocusedsearchbar={function (value: SetStateAction<boolean>): boolean {
                {true};
                throw new Error("Function not implemented.");
            } } />
      </Provider>
    );
    // const user = userEvent.setup();
  
    const searchBar = screen.getByTestId("search-bar");
    const searchBtn = screen.getByTestId("search-btn");
  
    expect(searchBar).toBeInTheDocument();
    expect(searchBar).toHaveAttribute("placeholder", "Search Location");
    expect(searchBar).toHaveAttribute("value");
    expect(searchBar).toHaveAttribute("type", "text");
    expect(searchBar).toHaveClass("imput-location");
  
    expect(searchBtn).toBeInTheDocument();
    expect(searchBtn).toHaveClass("search-icon");
  
    // await user.type(searchBar, "Agra");
  
    
  });

  test("testing search bar", async () => {
    render(
        <Provider store={store}>
            <Suggestions location={""} setLocation={function (value: SetStateAction<string>): void {
                {""}
                throw new Error("Function not implemented.");
            } }/>
        </Provider>
    )

    // suggestions div becomes visible on typing
    const suggestions = screen.getByTestId("suggestions");
    expect(suggestions).toBeInTheDocument();
  });

 
