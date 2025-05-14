import { render, screen } from "@/lib/test-utils";
import { Navbar } from "@/components/layout/Navbar";

describe("Navbar", () => {
  it("renders the logo", () => {
    render(<Navbar />);

    const logo = screen.getByAltText(/texas elite gutters/i);
    expect(logo).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);

    // Get all navigation links
    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    const installationLinks = screen.getAllByRole("link", {
      name: /gutter installation/i,
    });
    const servicesLinks = screen.getAllByRole("link", {
      name: /gutter services/i,
    });
    const exteriorLinks = screen.getAllByRole("link", {
      name: /exterior services/i,
    });
    const contactLinks = screen.getAllByRole("link", { name: /contact us/i });

    // Check that at least one of each link exists
    expect(homeLinks.length).toBeGreaterThan(0);
    expect(installationLinks.length).toBeGreaterThan(0);
    expect(servicesLinks.length).toBeGreaterThan(0);
    expect(exteriorLinks.length).toBeGreaterThan(0);
    expect(contactLinks.length).toBeGreaterThan(0);

    // Check the first link of each type has the correct href
    expect(homeLinks[0]).toHaveAttribute("href", "/");
    expect(installationLinks[0]).toHaveAttribute(
      "href",
      "/gutter-installation",
    );
    expect(servicesLinks[0]).toHaveAttribute("href", "/gutter-services");
    expect(exteriorLinks[0]).toHaveAttribute("href", "/exterior-services");
    expect(contactLinks[0]).toHaveAttribute("href", "/contact");
  });

  it("toggles mobile menu when hamburger button is clicked", async () => {
    const { user } = render(<Navbar />);

    // Mobile menu should be hidden initially
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveClass("hidden");

    // Click the hamburger button
    const menuButton = screen.getByLabelText(/toggle menu/i);
    await user.click(menuButton);

    // Mobile menu should be visible
    expect(mobileMenu).not.toHaveClass("hidden");

    // Click again to hide
    await user.click(menuButton);
    expect(mobileMenu).toHaveClass("hidden");
  });

  it("renders a styled hamburger menu icon", () => {
    render(<Navbar />);

    // Get the hamburger button
    const menuButton = screen.getByLabelText(/toggle menu/i);

    // Find the SVG element inside the button
    const svgIcon = menuButton.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();

    // Check that the SVG has the larger size classes
    expect(svgIcon).toHaveClass("h-8");
    expect(svgIcon).toHaveClass("w-8");

    // Check for styling classes
    expect(svgIcon).toHaveClass("text-[#C9A357]");
  });

  it("displays contact phone number", () => {
    render(<Navbar />);

    const phoneNumbers = screen.getAllByText(/210-835-7520/);
    expect(phoneNumbers.length).toBeGreaterThan(0);
  });

  it("has a contact button", () => {
    render(<Navbar />);

    // Find all buttons with the text "Get a Quote"
    const quoteButtons = screen.getAllByText(/get a quote/i);
    expect(quoteButtons.length).toBeGreaterThan(0);

    // Find all links to the booking page
    const contactLinks = screen.getAllByRole("link", { name: /get a quote/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(contactLinks[0]).toHaveAttribute(
      "href",
      "https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true",
    );
  });
});
