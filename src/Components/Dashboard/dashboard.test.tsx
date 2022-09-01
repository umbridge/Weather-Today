import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./../../app/store"
import Dashboard from "./dashboard";

afterEach(cleanup);

test("Dashboard renders successfully", () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  expect(screen.getByTestId("dashboard")).toBeInTheDocument();
});

