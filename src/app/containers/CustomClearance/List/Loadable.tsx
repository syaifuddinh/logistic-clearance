/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const CustomClearanceRequestList = lazyLoad(
    () => import("./index"),
    module => module.default
);
