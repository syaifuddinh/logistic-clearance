/**
 * Asynchronously loads the component for Companies
 */

import { lazyLoad } from "utils/loadable";

export const Companies = lazyLoad(
    () => import("./index"),
    module => module.default
);
