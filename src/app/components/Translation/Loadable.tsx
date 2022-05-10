/**
 * Asynchronously loads the component for Wizard
 */

import { lazyLoad } from "utils/loadable";

export const GeneralTranslation = lazyLoad(
    () => import("./index"),
    module => module.default
);
