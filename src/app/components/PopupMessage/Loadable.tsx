/**
 * Asynchronously loads the component for DatePick
 */

import { lazyLoad } from "utils/loadable";

export const PopupMessage = lazyLoad(
    () => import("./index"),
    module => module.default
);
