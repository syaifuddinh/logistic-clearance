/** 
 * Asynchronously loads the component for Menu 
 */

import { lazyLoad } from "utils/loadable";

export const Menu = lazyLoad(
    () => import("./index"),
    module => module.default
);
