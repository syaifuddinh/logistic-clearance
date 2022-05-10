/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const RequestSP2 = lazyLoad(
    () => import("./index"),
    module => module.default
);
