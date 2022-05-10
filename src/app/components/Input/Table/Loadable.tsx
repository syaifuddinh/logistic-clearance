/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const TableInput = lazyLoad(
    () => import("./Index"),
    module => module.default
);
