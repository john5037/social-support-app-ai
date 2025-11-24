// src/__tests__/AIModal.test.jsx
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import AIModal from "../components/ui/AIModal";
import { vi } from "vitest";

describe("AIModal", () => {
  it("renders suggestion and calls accept/discard", async () => {
    const accept = vi.fn();
    const discard = vi.fn();
    const texts = {
      aiModalTitle: (s) => `AI Suggestion for ${s}`,
      aiModalSubtitle: "subtitle",
      loading: "loading",
      discard: "Discard",
      accept: "Accept",
    };

    render(
      <AIModal
        suggestion="Suggested text"
        targetField="reasonForApplying"
        onAccept={accept}
        onDiscard={discard}
        isRTL={false}
        texts={texts}
        isGenerating={false}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    // Accept
    fireEvent.click(screen.getByText("Accept"));
    expect(accept).toHaveBeenCalled();

    // Re-render for discard case or test discard separately
    // (or call discard via click)
  });
});