import nextCoreVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: ["skills/**"],
  },
  ...nextCoreVitals,
  ...nextTypeScript,
];

export default eslintConfig;
