import temp from './defaultexport.js'; // we can choose the name, since its default export
import {one as anothername, two} from './multipleexport.js'; // this is named export, we have to use the same name but alies is possible
import * as bundled from './multipleexport.js';

console.log(temp.name);
console.log(anothername);
console.log(two);
console.log(bundled.one);
