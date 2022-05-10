/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const CustomClearanceRequestShow = lazyLoad(
    () => import("./index"),
    module => module.default
);
