/**
 * Asynchronously loads the component for Wizard
 */

import { lazyLoad } from "utils/loadable";

export const SP2Wizard = lazyLoad(
    () => import("./index"),
    module => module.default
);
