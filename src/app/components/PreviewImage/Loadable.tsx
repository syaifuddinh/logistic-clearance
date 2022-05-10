/**
 * Asynchronously loads the component for DatePick
 */

import { lazyLoad } from "utils/loadable";

export const PreviewImage = lazyLoad(
    () => import("./index"),
    module => module.default
);
