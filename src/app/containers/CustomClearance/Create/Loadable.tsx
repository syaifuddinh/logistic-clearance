/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const CustomClearanceCreate = lazyLoad(
    () => import("./index"),
    module => module.default
);
