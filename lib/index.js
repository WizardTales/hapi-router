"use strict";

import glob from "glob";
import castArray from "cast-array";
import pkg from "../package.json";

exports.plugin = {
  register: async (server, options) => {
    let globOptions = {
      nodir: true,
      strict: true,
      cwd: options.cwd || process.cwd(),
      ignore: options.ignore
    };

    for (const pattern of castArray(options.routes)) {
      const files = glob.sync(pattern, globOptions);

      for (const file of files) {
        const route = await import(globOptions.cwd + "/" + file);
        server.route(route.default || route);
      }
    }
  },
  pkg
};
