/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const SP2RequestList = lazyLoad(
    () => import("./index"),
    module => module.default
);
