/**
 * Asynchronously loads the component for DatePick
 */

import { lazyLoad } from "utils/loadable";

export const Order = lazyLoad(
    () => import("./index"),
    module => module.default
);
