/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const DelegateCreate = lazyLoad(
    () => import("./index"),
    module => module.default
);
