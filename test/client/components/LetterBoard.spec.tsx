import React, { ReactElement } from "react";
import { renderWithStore, screen, fireEvent } from "test-utils";

import LetterBoard from "client/components/LetterBoard";

describe("LetterBoard", () => {
  let sentence;
  beforeEach(() => {
    sentence = ["t", "e", "s", "t"];
    renderWithStore(<LetterBoard />, { game: { sentence } });
  });

  it("displays blank LetterBoxes for each char in sentence", () => {
    expect(screen.getAllByTestId("letter-box").length).toEqual(sentence.length);
  });
});
