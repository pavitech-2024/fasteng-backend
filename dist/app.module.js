"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const ErrorsInterceptor_1 = require("./config/interceptors/ErrorsInterceptor");
const middlewares_1 = require("./modules/auth/middlewares");
const database_module_1 = require("./infra/mongoose/database.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const asphalt_module_1 = require("./modules/asphalt/asphalt.module");
const soils_module_1 = require("./modules/soils/soils.module");
const concrete_module_1 = require("./modules/concrete/concrete.module");
const report_error_module_1 = require("./modules/report-error/report-error.module");
const report_error_controller_1 = require("./modules/report-error/report-error.controller");
const pro_medina_module_1 = require("./modules/pro-medina/pro-medina.module");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(middlewares_1.AuthMiddleware)
            .exclude({ path: '/', method: common_1.RequestMethod.GET }, { path: 'favicon.ico', method: common_1.RequestMethod.GET }, { path: 'favicon.png', method: common_1.RequestMethod.GET }, { path: 'auth/refresh-login', method: common_1.RequestMethod.POST }, { path: 'auth/login', method: common_1.RequestMethod.POST }, { path: 'users', method: common_1.RequestMethod.POST }, { path: 'docs/asphalt', method: common_1.RequestMethod.GET }, { path: 'docs/soils', method: common_1.RequestMethod.GET }, { path: 'docs/concrete', method: common_1.RequestMethod.GET }, { path: 'docs/promedina', method: common_1.RequestMethod.GET }, { path: 'app/health-check', method: common_1.RequestMethod.GET })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            asphalt_module_1.AsphaltModule,
            soils_module_1.SoilsModule,
            concrete_module_1.ConcreteModule,
            report_error_module_1.ReportErrorModule,
            pro_medina_module_1.ProMedinaModule,
            mongoose_1.MongooseModule,
        ],
        controllers: [report_error_controller_1.ReportErrorController, app_controller_1.AppController],
        providers: [{ provide: core_1.APP_INTERCEPTOR, useClass: ErrorsInterceptor_1.ErrorsInterceptor }, app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map