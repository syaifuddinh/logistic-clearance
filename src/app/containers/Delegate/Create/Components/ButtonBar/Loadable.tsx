/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const ButtonBar = lazyLoad(
    () => import("./index"),
    module => module.default
);
