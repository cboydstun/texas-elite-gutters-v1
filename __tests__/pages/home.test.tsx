import { render, screen } from "@/lib/test-utils";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders hero section with correct heading", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /texas elite gutter installation & services/i,
      }),
    ).toBeInTheDocument();
  });

  it("displays service areas", () => {
    render(<HomePage />);

    expect(screen.getAllByText(/san antonio/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/converse/i)[0]).toBeInTheDocument();
  });

  it("shows contact information", () => {
    render(<HomePage />);

    expect(screen.getByText(/210-835-7520/i)).toBeInTheDocument();
  });

  it("has navigation links to all pages", () => {
    render(<HomePage />);

    // Find links by their href attributes
    const gutterInstallationLink = screen.getByText("Learn More", {
      selector: 'a[href="/gutter-installation"]',
    });
    const gutterServicesLink = screen.getByText("Learn More", {
      selector: 'a[href="/gutter-services"]',
    });
    const exteriorServicesLink = screen.getByText("Learn More", {
      selector: 'a[href="/exterior-services"]',
    });
    const contactLink = screen.getByText("Get in Touch", {
      selector: 'a[href="/contact"]',
    });

    expect(gutterInstallationLink).toBeInTheDocument();
    expect(gutterServicesLink).toBeInTheDocument();
    expect(exteriorServicesLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });
});
