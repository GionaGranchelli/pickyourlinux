export default [
  {
    files: ["src/components/**/*.{vue,ts,js}", "pages/**/*.{vue,ts,js}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "~/engine/logic",
              message: "UI must not import engine VM logic directly. Use engine/state instead."
            },
            {
              name: "~/engine/eliminate",
              message: "UI must not import elimination logic directly. Use engine/state instead."
            },
            {
              name: "~/engine/compatibility",
              message: "UI must not import compatibility logic directly. Use engine/state instead."
            }
          ]
        }
      ]
    }
  }
];
