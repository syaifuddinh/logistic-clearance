/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const Confirmation = lazyLoad(
    () => import("./index"),
    module => module.default
);
