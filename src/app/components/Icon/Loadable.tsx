/**
 * Asynchronously loads the component for DatePick
 */

import { lazyLoad } from "utils/loadable";

export const GologsIcon = lazyLoad(
    () => import("./index"),
    module => module.default
);
