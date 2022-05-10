/**
 * Asynchronously loads the component for Header
 */

import { lazyLoad } from "utils/loadable";

export const SecondaryHeader = lazyLoad(
    () => import("./index"),
    module => module.default
);
