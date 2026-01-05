import React from "react";

export const LazyInteractiveMap = React.lazy(() =>
    import("./interactive-map/interactive-map.component").then(module => ({
        default: module.InteractiveMap
    }))
)

