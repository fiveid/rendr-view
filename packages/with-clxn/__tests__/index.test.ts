import { clxn } from "../src";

describe("clxn", () => {
  it("concatenates utility classes of input and defaults", () => {
    const defaults = { container: "bg-black", inner: "text-2xl mt-4" };

    const output = clxn<{}, keyof typeof defaults>(
      { container: "w-full" },
      defaults,
      {}
    );

    expect(output).toStrictEqual(
      expect.objectContaining({
        container: "bg-black w-full",
        inner: "text-2xl mt-4"
      })
    );
  });

  it("supports input and/or defaults as functions", () => {
    const defaults = () => ({ container: "bg-black", inner: "text-2xl mt-4" });
    const output = clxn(() => ({ container: "w-full" }), defaults, {});

    expect(output).toStrictEqual(
      expect.objectContaining({
        container: "bg-black w-full",
        inner: "text-2xl mt-4"
      })
    );
  });
});
