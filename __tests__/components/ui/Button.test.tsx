import { render, screen } from "@/lib/test-utils";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
    expect(button).not.toBeDisabled();
  });

  it("applies primary variant styles", () => {
    render(<Button variant="primary">Primary</Button>);

    const button = screen.getByRole("button", { name: /primary/i });
    expect(button).toHaveClass("bg-primary text-white");
  });

  it("applies secondary variant styles", () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole("button", { name: /secondary/i });
    expect(button).toHaveClass("bg-white text-primary border-primary");
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    const { user } = render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50 cursor-not-allowed");
  });
});
