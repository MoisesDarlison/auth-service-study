import { Config } from "jest";
import { defaults } from "jest-config";

import globalConfig from "./jest.config";
const config: Config = {
  ...defaults,
  ...globalConfig,
  testMatch: ["**/*.spec.ts"],
};

export default config;
