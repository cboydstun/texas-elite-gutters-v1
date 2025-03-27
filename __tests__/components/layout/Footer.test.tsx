import { render, screen } from "@/lib/test-utils";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders the business name", () => {
    render(<Footer />);

    const businessNames = screen.getAllByText(
      /texas elite gutters & exteriors/i
    );
    expect(businessNames.length).toBeGreaterThan(0);
  });

  it("renders service areas", () => {
    render(<Footer />);

    const sanAntonioTexts = screen.getAllByText(/san antonio/i);
    const converseTexts = screen.getAllByText(/converse/i);

    expect(sanAntonioTexts.length).toBeGreaterThan(0);
    expect(converseTexts.length).toBeGreaterThan(0);
  });

  it("renders contact information", () => {
    render(<Footer />);

    const phoneNumbers = screen.getAllByText(/210-835-7520/);
    expect(phoneNumbers.length).toBeGreaterThan(0);
  });

  it("renders navigation links", () => {
    render(<Footer />);

    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    const installationLinks = screen.getAllByRole("link", {
      name: /gutter installation/i,
    });
    const cleaningLinks = screen.getAllByRole("link", {
      name: /gutter cleaning/i,
    });
    const exteriorLinks = screen.getAllByRole("link", {
      name: /exterior services/i,
    });
    const contactLinks = screen.getAllByRole("link", { name: /contact us/i });

    expect(homeLinks.length).toBeGreaterThan(0);
    expect(installationLinks.length).toBeGreaterThan(0);
    expect(cleaningLinks.length).toBeGreaterThan(0);
    expect(exteriorLinks.length).toBeGreaterThan(0);
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it("renders copyright information", () => {
    render(<Footer />);

    const copyrightTexts = screen.getAllByText(/copyright/i);
    const year = new Date().getFullYear().toString();

    expect(copyrightTexts.length).toBeGreaterThan(0);
    expect(copyrightTexts[0]).toHaveTextContent(year);
  });
});
