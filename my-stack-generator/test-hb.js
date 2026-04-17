import Handlebars from 'handlebars/runtime.js';
import fs from 'fs';

Handlebars.registerHelper('test', () => 'it works');
console.log(Object.keys(Handlebars));
