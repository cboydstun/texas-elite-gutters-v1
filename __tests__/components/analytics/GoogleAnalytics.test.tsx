import React from "react";
import { render } from "@testing-library/react";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

// Mock next/script
jest.mock("next/script", () => {
  return ({ children, dangerouslySetInnerHTML, ...props }: any) => {
    if (dangerouslySetInnerHTML) {
      return (
        <script {...props} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
      );
    }
    return <script {...props}>{children}</script>;
  };
});

describe("GoogleAnalytics", () => {
  it("renders Google Analytics scripts", () => {
    const { container } = render(<GoogleAnalytics />);

    // Check for GA script tags
    const scriptTags = container.querySelectorAll("script");
    expect(scriptTags.length).toBe(2);

    // Check for GA tracking ID in the src attribute
    expect(scriptTags[0].getAttribute("src")).toContain("G-PMBQSXREJD");

    // Check for gtag initialization in the inline script
    expect(scriptTags[1].innerHTML).toContain("gtag('config', 'G-PMBQSXREJD')");
  });
});
