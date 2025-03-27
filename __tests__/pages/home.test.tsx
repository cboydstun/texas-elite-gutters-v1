import { render, screen } from "@/lib/test-utils";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders hero section with correct heading", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /texas elite gutters & exteriors/i,
      })
    ).toBeInTheDocument();
  });

  it("displays service areas", () => {
    render(<HomePage />);

    expect(screen.getByText(/san antonio, tx/i)).toBeInTheDocument();
    expect(screen.getByText(/converse, tx/i)).toBeInTheDocument();
  });

  it("shows contact information", () => {
    render(<HomePage />);

    expect(screen.getByText(/210-835-7520/i)).toBeInTheDocument();
  });

  it("has navigation links to all pages", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("link", { name: /gutter installation/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /gutter cleaning and repairs/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /exterior services/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /contact us/i })
    ).toBeInTheDocument();
  });
});
