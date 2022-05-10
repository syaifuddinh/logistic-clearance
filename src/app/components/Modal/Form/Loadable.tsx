/**
 * Asynchronously loads the component for DatePick
 */

import { lazyLoad } from "utils/loadable";

export const FormModal = lazyLoad(
    () => import("./index"),
    module => module.default
);
