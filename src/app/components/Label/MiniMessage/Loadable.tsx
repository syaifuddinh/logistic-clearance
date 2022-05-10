/**
 * Asynchronously loads the component for DatePick
 */

import { lazyLoad } from "utils/loadable";

export const MiniMessage = lazyLoad(
    () => import("./index"),
    module => module.default
);
