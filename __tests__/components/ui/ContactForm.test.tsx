import { render, screen, waitFor } from "@/lib/test-utils";
import { ContactForm } from "@/components/ui/ContactForm";

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    const { user } = render(<ContactForm onSubmit={jest.fn()} />);

    // Submit without filling fields
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Check for error messages
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/phone is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  it("validates email format", async () => {
    const { user } = render(<ContactForm onSubmit={jest.fn()} />);

    // Fill with invalid email
    await user.type(screen.getByLabelText(/email/i), "invalid-email");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Check for error message
    expect(
      await screen.findByText(/invalid email format/i)
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const handleSubmit = jest.fn();
    const { user } = render(<ContactForm onSubmit={handleSubmit} />);

    // Fill form with valid data
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/phone/i), "210-555-1234");
    await user.type(
      screen.getByLabelText(/message/i),
      "I need gutter installation"
    );

    // Submit form
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Verify submission
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        phone: "210-555-1234",
        message: "I need gutter installation",
      });
    });
  });
});
