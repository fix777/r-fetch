import * as fs from "fs";
import * as path from "path";

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  appSrc: resolveApp("src"),
  appDev: resolveApp("_dev_"),
  appHtml: resolveApp('public/index.html'),
  appIndexTsx: resolveApp("src/index.tsx"),
  appDist: resolveApp("dist"),
  indexTs: resolveApp("src/utils/index.ts"),
};

export default paths;
