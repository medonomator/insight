const accessControl = {
  register: function (server, options, next) {
    // add functionality -> we’ll do that in the section below

    // call next() to signal hapi that your plugin has done the job
    next();
  },
};

(accessControl.register as any).attributes = {
  name: "accessControl",
  version: "0.0.1",
};

module.exports = accessControl;
