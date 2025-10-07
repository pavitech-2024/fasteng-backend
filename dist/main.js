"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const samples_module_1 = require("./modules/soils/samples/samples.module");
const http_exception_filter_1 = require("./config/filters/http-exception.filter");
const granulometry_module_1 = require("./modules/soils/essays/granulometry/granulometry.module");
const granulometry_module_2 = require("./modules/asphalt/essays/granulometry/granulometry.module");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['error', 'warn', 'debug', 'log'],
        });
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter());
        app.use(bodyParser.json({ limit: '10mb' }));
        app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
        const swagger_asphalt = new swagger_1.DocumentBuilder()
            .setTitle('FastEng API')
            .setDescription(`The FastEng [ Asphalt ] API description`)
            .setVersion('1.0')
            .build();
        swagger_1.SwaggerModule.setup('docs/asphalt', app, swagger_1.SwaggerModule.createDocument(app, swagger_asphalt, {
            include: [auth_module_1.AuthModule, users_module_1.UsersModule, granulometry_module_2.AsphaltGranulometryModule],
        }));
        const swagger_soils = new swagger_1.DocumentBuilder()
            .setTitle('FastEng API')
            .setDescription(`The FastEng [ Soils ] API description`)
            .setVersion('1.0')
            .build();
        swagger_1.SwaggerModule.setup('docs/soils', app, swagger_1.SwaggerModule.createDocument(app, swagger_soils, {
            include: [auth_module_1.AuthModule, users_module_1.UsersModule, samples_module_1.SamplesModule, granulometry_module_1.GranulometryModule],
        }));
        const swagger_concrete = new swagger_1.DocumentBuilder()
            .setTitle('FastEng API')
            .setDescription(`The FastEng [ Concrete ] API description`)
            .setVersion('1.0')
            .build();
        swagger_1.SwaggerModule.setup('docs/concrete', app, swagger_1.SwaggerModule.createDocument(app, swagger_concrete));
        app.getHttpAdapter().get('/', (req, res) => {
            res.json({ status: 'API is running!' });
        });
        const port = process.env.PORT || 8080;
        yield app.listen(port, () => common_1.Logger.log(`Server is running on port ${port}`));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map