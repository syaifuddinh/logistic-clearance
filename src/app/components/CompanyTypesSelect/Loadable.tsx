/**
 * Asynchronously loads the component for CompanyTypesSelect
 */

import { lazyLoad } from "utils/loadable";

export const CompanyTypesSelect = lazyLoad(
  () => import("./index"),
  module => module.default
);
