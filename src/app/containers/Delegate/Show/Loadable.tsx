/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const DelegateShow = lazyLoad(
    () => import("./index"),
    module => module.default
);
