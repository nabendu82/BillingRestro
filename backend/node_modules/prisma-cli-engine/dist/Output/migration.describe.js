"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../Config");
var index_1 = require("./index");
var migration_1 = require("./migration");
var steps_1 = require("./fixtures/steps");
var config = new Config_1.Config({ mock: false });
var out = new index_1.Output(config);
var printer = new migration_1.MigrationPrinter(out);
printer.printMessages(steps_1.steps);
//# sourceMappingURL=migration.describe.js.map