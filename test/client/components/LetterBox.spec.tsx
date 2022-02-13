import React, { ReactElement } from "react";
import { render, screen, fireEvent, RenderResult } from "test-utils";

import { LetterBox } from "client/components/LetterBox";

describe("LetterBox", () => {
  let wrapper: RenderResult;
  beforeEach(() => (wrapper = render(<LetterBox />)));

  it("is defined", () => {
    expect(wrapper.container).toBeDefined();
  });

  it("displays empty div", () => {
    // @ts-ignore
    expect(wrapper.container.firstChild.firstChild.innerHTML).toEqual("");
  });

  it("does not display passed letter prop", () => {
    render(<LetterBox letter={"a"} />);

    expect(screen.queryByText("a")).toBeNull();
  });

  it("does not display letter if it does not match guess letter", () => {
    render(<LetterBox letter={"a"} guess={"b"} />);

    expect(screen.queryByText("a")).toBeNull();
  });

  it("displays letter if it matches guess letter", () => {
    render(<LetterBox letter={"b"} guess={"b"} />);

    expect(screen.getByText("b")).toBeDefined();
  });

  it("displays letter case insensitive when they match", () => {
    render(<LetterBox letter={"B"} guess={"b"} />);

    expect(screen.getByText("B")).toBeDefined();
  });
});
