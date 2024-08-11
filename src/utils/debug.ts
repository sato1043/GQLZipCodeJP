import packageJson from '../../package.json';
import debug from "debug";
export default debug(`${packageJson.name}`);
