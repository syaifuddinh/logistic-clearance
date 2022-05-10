/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from "utils/loadable";

export const DepoPage = lazyLoad(
    () => import("./index"),
    module => module.default
);
