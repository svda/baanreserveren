"use strict";
// import { createCrawler } from './crawler'
// import { createTaskRunner } from './task-runner'
// import { loadBoolean } from './config'
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// const crawler = createCrawler({
//   debug: loadBoolean(process.env.DEBUG, false),
//   dryRun: loadBoolean(process.env.DRY_RUN, false),
// })
// const app = createTaskRunner({
//   crawler,
// })
// app.run()
__exportStar(require("./functions"), exports);
//# sourceMappingURL=index.js.map