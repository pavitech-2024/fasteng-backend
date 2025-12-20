"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var GranulometryComposition_Marshall_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GranulometryComposition_Marshall_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../essays/granulometry/repository");
const interfaces_1 = require("../../../../../utils/interfaces");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
const repository_2 = require("../repository");
let GranulometryComposition_Marshall_Service = GranulometryComposition_Marshall_Service_1 = class GranulometryComposition_Marshall_Service {
    constructor(marshallModel, granulometry_repository, marshallRepository) {
        this.marshallModel = marshallModel;
        this.granulometry_repository = granulometry_repository;
        this.marshallRepository = marshallRepository;
        this.logger = new common_1.Logger(GranulometryComposition_Marshall_Service_1.name);
    }
    getGranulometryData(aggregates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('🔍 === INÍCIO getGranulometryData ===');
                console.log('Aggregates recebidos:', JSON.stringify(aggregates, null, 2));
                if (!aggregates || !Array.isArray(aggregates) || aggregates.length === 0) {
                    return { table_column_headers: ['sieve_label'], table_rows: [] };
                }
                const granulometry_data = [];
                const granulometrys = yield this.granulometry_repository.findAll();
                console.log('📊 Total de ensaios:', granulometrys.length);
                aggregates.forEach((aggregate) => {
                    var _a, _b, _c, _d, _e, _f;
                    console.log(`\n🔍 Processando aggregate: ${aggregate.name} (${aggregate._id})`);
                    const granulometry = granulometrys.find(({ generalData }) => {
                        if (!generalData || !generalData.material)
                            return false;
                        return generalData.material._id.toString() === aggregate._id.toString();
                    });
                    if (!granulometry) {
                        console.log('  ❌ Nenhum ensaio encontrado');
                        granulometry_data.push({
                            _id: aggregate._id,
                            passants: {},
                        });
                        return;
                    }
                    console.log('  ✅ Ensaio encontrado! ID:', granulometry._id);
                    console.log('  🔎 Investigando estrutura do ensaio:');
                    if (granulometry.step2Data) {
                        console.log('    - Tem step2Data? SIM');
                        console.log('    - Keys do step2Data:', Object.keys(granulometry.step2Data));
                        if (granulometry.step2Data.table_data) {
                            console.log('    - Tem table_data? SIM');
                            console.log('    - Keys do table_data:', Object.keys(granulometry.step2Data.table_data));
                            if (granulometry.step2Data.table_data.rows && Array.isArray(granulometry.step2Data.table_data.rows)) {
                                console.log('    - Tem rows no table_data? SIM');
                                console.log('    - Quantidade de rows:', granulometry.step2Data.table_data.rows.length);
                                if (granulometry.step2Data.table_data.rows.length > 0) {
                                    console.log('    - Primeira row:', JSON.stringify(granulometry.step2Data.table_data.rows[0], null, 2));
                                }
                                const rows = granulometry.step2Data.table_data.rows;
                                const passants = {};
                                rows.forEach((row, index) => {
                                    console.log(`    Row ${index}:`, row);
                                    if (row && row.sieve_label) {
                                        const value = row.accumulated_passant !== undefined ? row.accumulated_passant :
                                            row.passant !== undefined ? row.passant :
                                                null;
                                        if (value !== null) {
                                            passants[row.sieve_label] = value;
                                            console.log(`      ✅ Peneira: ${row.sieve_label} = ${value}`);
                                        }
                                        else {
                                            console.log(`      ⚠️ Peneira ${row.sieve_label} sem valor de passant`);
                                        }
                                    }
                                });
                                console.log('    Passants extraídos:', Object.keys(passants).length, 'peneiras');
                                granulometry_data.push({
                                    _id: aggregate._id,
                                    passants: passants,
                                });
                                return;
                            }
                        }
                    }
                    console.log('    - Tem data?', !!granulometry.data);
                    console.log('    - Tem results?', !!granulometry.results);
                    console.log('    - Tem passant direto?', !!granulometry.passant);
                    let passantData = null;
                    if (granulometry.passant && Array.isArray(granulometry.passant)) {
                        console.log('  📌 Passant encontrado em granulometry.passant');
                        passantData = granulometry.passant;
                    }
                    else if (((_a = granulometry.step2Data) === null || _a === void 0 ? void 0 : _a.passant) && Array.isArray(granulometry.step2Data.passant)) {
                        console.log('  📌 Passant encontrado em granulometry.step2Data.passant');
                        passantData = granulometry.step2Data.passant;
                    }
                    else if (((_c = (_b = granulometry.step2Data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.passant) && Array.isArray(granulometry.step2Data.data.passant)) {
                        console.log('  📌 Passant encontrado em granulometry.step2Data.data.passant');
                        passantData = granulometry.step2Data.data.passant;
                    }
                    else if (((_d = granulometry.results) === null || _d === void 0 ? void 0 : _d.passant) && Array.isArray(granulometry.results.passant)) {
                        console.log('  📌 Passant encontrado em granulometry.results.passant');
                        passantData = granulometry.results.passant;
                    }
                    else if (((_e = granulometry.data) === null || _e === void 0 ? void 0 : _e.passant) && Array.isArray(granulometry.data.passant)) {
                        console.log('  📌 Passant encontrado em granulometry.data.passant');
                        passantData = granulometry.data.passant;
                    }
                    else if (((_f = granulometry.table_data) === null || _f === void 0 ? void 0 : _f.rows) && Array.isArray(granulometry.table_data.rows)) {
                        console.log('  📌 Dados encontrados em granulometry.table_data.rows');
                        const rows = granulometry.table_data.rows;
                        const passants = {};
                        rows.forEach(row => {
                            if (row && row.sieve_label) {
                                const value = row.accumulated_passant !== undefined ? row.accumulated_passant :
                                    row.passant !== undefined ? row.passant :
                                        null;
                                if (value !== null) {
                                    passants[row.sieve_label] = value;
                                }
                            }
                        });
                        granulometry_data.push({
                            _id: aggregate._id,
                            passants: passants,
                        });
                        return;
                    }
                    if (!passantData) {
                        console.log('  ❌ Nenhum dado de passant encontrado em nenhum lugar!');
                        console.log('  📋 Estrutura completa do ensaio:');
                        const keys = Object.keys(granulometry);
                        console.log('  Keys principais:', keys);
                        ['step2Data', 'data', 'results', 'table_data'].forEach(key => {
                            if (granulometry[key]) {
                                console.log(`  Conteúdo de ${key}:`, Object.keys(granulometry[key]));
                            }
                        });
                        granulometry_data.push({
                            _id: aggregate._id,
                            passants: {},
                        });
                        return;
                    }
                    console.log('    Passant encontrado:', passantData.length, 'itens');
                    console.log('    🔎 Estrutura do primeiro item do passant:');
                    if (passantData.length > 0) {
                        console.log('      Primeiro item:', passantData[0]);
                        console.log('      Tipo:', typeof passantData[0]);
                        console.log('      É array?', Array.isArray(passantData[0]));
                        if (typeof passantData[0] === 'object') {
                            console.log('      Keys do primeiro item:', Object.keys(passantData[0]));
                        }
                    }
                    let passants = {};
                    passantData.forEach((p, index) => {
                        console.log(`    Item ${index}:`, p);
                        if (p) {
                            let sieveLabel = null;
                            let passantValue = null;
                            if (p.sieve_label !== undefined && p.passant !== undefined) {
                                sieveLabel = p.sieve_label;
                                passantValue = p.passant;
                            }
                            else if (p.label !== undefined && p.value !== undefined) {
                                sieveLabel = p.label;
                                passantValue = p.value;
                            }
                            else if (Array.isArray(p) && p.length >= 2) {
                                sieveLabel = p[0];
                                passantValue = p[1];
                            }
                            else if (p.sieve_label !== undefined && p.accumulated_passant !== undefined) {
                                sieveLabel = p.sieve_label;
                                passantValue = p.accumulated_passant;
                            }
                            else {
                                if (typeof p === 'object') {
                                    console.log('      Keys:', Object.keys(p));
                                    for (const key in p) {
                                        if (typeof p[key] === 'number' && (key.includes('passant') || key.includes('value'))) {
                                            sieveLabel = key;
                                            passantValue = p[key];
                                            break;
                                        }
                                    }
                                }
                            }
                            if (sieveLabel !== null && passantValue !== null) {
                                passants[sieveLabel] = passantValue;
                                console.log(`      ✅ Adicionado: ${sieveLabel} = ${passantValue}`);
                            }
                        }
                    });
                    console.log('    Passants extraídos:', Object.keys(passants).length, 'peneiras');
                    if (Object.keys(passants).length > 0) {
                        console.log('    Peneiras:', Object.keys(passants));
                    }
                    granulometry_data.push({
                        _id: aggregate._id,
                        passants: passants,
                    });
                });
                console.log('\n📊 RESUMO DOS DADOS COLETADOS:');
                granulometry_data.forEach((data, index) => {
                    const hasData = Object.keys(data.passants).length > 0;
                    console.log(`  Aggregate ${index + 1}: ${data._id} - ${hasData ? 'COM dados' : 'SEM dados'}`);
                    if (hasData) {
                        console.log(`    Peneiras: ${Object.keys(data.passants).join(', ')}`);
                    }
                });
                const table_column_headers = [];
                const table_rows = [];
                table_column_headers.push('sieve_label');
                interfaces_1.AllSieves.forEach((sieve) => {
                    const contains = granulometry_data.some((aggregate) => sieve.label in aggregate.passants);
                    if (contains) {
                        const aggregates_data = {};
                        granulometry_data.forEach((aggregate) => {
                            const { _id, passants } = aggregate;
                            aggregates_data['total_passant_'.concat(_id)] = passants[sieve.label] || null;
                            aggregates_data['passant_'.concat(_id)] = null;
                            if (!table_column_headers.some((header) => header.includes(_id))) {
                                table_column_headers.push('total_passant_'.concat(_id));
                                table_column_headers.push('passant_'.concat(_id));
                            }
                        });
                        table_rows.push(Object.assign({ sieve_label: sieve.label }, aggregates_data));
                    }
                });
                console.log('\n📋 TABELA GERADA:');
                console.log('  Table rows:', table_rows.length);
                console.log('  Table columns:', table_column_headers.length);
                console.log('  Columns:', table_column_headers);
                if (table_rows.length === 0) {
                    console.log('❌ TABELA VAZIA! Possíveis causas:');
                    console.log('  1. Nenhum dado de passant encontrado');
                    console.log('  2. As peneiras em AllSieves não batem com as dos dados');
                    console.log('  3. sieve_labels diferentes');
                    const allSieveLabels = new Set();
                    granulometry_data.forEach(agg => {
                        Object.keys(agg.passants).forEach(label => {
                            allSieveLabels.add(label);
                        });
                    });
                    console.log('  Sieve_labels encontrados nos dados:', Array.from(allSieveLabels));
                    console.log('  Primeiras 5 peneiras de AllSieves:', interfaces_1.AllSieves.slice(0, 5).map(s => s.label));
                }
                const table_data = {
                    table_column_headers,
                    table_rows,
                };
                console.log('✅ === FIM getGranulometryData ===');
                return table_data;
            }
            catch (error) {
                console.error('💥 Error in getGranulometryData:', error);
                throw error;
            }
        });
    }
    calculateGranulometry(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dnitBands, percentageInputs, tableRows } = body;
                let percentsOfDosage = [];
                const ids1 = new Set();
                Object.keys(percentageInputs[0]).forEach((key) => {
                    const id = key.split('_')[1];
                    ids1.add(id);
                    const value = percentageInputs[0][key];
                    const index = Array.from(ids1).indexOf(id);
                    percentsOfDosage[index] = { [id]: value };
                });
                const ids2 = new Set();
                let percentsOfMaterials = [];
                for (let i = 0; i < percentsOfDosage.length; i++) {
                    let obj = percentsOfDosage[i];
                    let key = Object.keys(obj)[0];
                    percentsOfMaterials.push(Array(20).fill({ [key]: null }));
                }
                let newTableRows = tableRows;
                tableRows.forEach((element) => {
                    Object.keys(element).forEach((key) => {
                        if (key === 'sieve_label') {
                            const sieveLabel = element[key];
                            Object.keys(element).forEach((key2) => {
                                const stringIdx = key2.lastIndexOf('_');
                                if (stringIdx !== -1) {
                                    const firstString = key2.substring(0, stringIdx);
                                    if (firstString === 'total_passant') {
                                        const id = key2.substring(stringIdx + 1);
                                        ids2.add(id);
                                        const value = element[key2];
                                        const internIndex = Array.from(ids2).indexOf(id);
                                        const sieveIndex = interfaces_1.AllSieves.findIndex((sieve) => sieve.label === sieveLabel);
                                        if (sieveIndex !== -1) {
                                            percentsOfMaterials[internIndex][sieveIndex] = { [id]: value };
                                        }
                                    }
                                }
                            });
                        }
                    });
                });
                const axisX = [
                    76, 64, 50, 38, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4, 2, 1.2, 0.85, 0.6, 0.43, 0.3, 0.25, 0.18, 0.15, 0.106,
                    0.075,
                ];
                let higherBandA = this.insertBlankPointsOnCurve([null, null, 100, 100, null, 100, 90, null, 65, null, 50, null, 40, null, null, 30, null, 20, null, 8], axisX);
                let lowerBandA = this.insertBlankPointsOnCurve([null, null, 100, 95, null, 75, 60, null, 35, null, 25, null, 20, null, null, 10, null, 5, null, 1], axisX);
                let higherBandB = this.insertBlankPointsOnCurve([null, null, null, 100, null, 100, 100, null, 80, null, 60, null, 45, null, null, 32, null, 20, null, 8], axisX);
                let lowerBandB = this.insertBlankPointsOnCurve([null, null, null, 100, null, 95, 80, null, 45, null, 28, null, 20, null, null, 10, null, 8, null, 3], axisX);
                let higherBandC = this.insertBlankPointsOnCurve([null, null, null, null, null, null, 100, 100, 90, null, 72, null, 50, null, null, 26, null, 16, null, 10], axisX);
                let lowerBandC = this.insertBlankPointsOnCurve([null, null, null, null, null, null, 100, 80, 70, null, 44, null, 22, null, null, 8, null, 4, null, 2], axisX);
                let band = { higher: [], lower: [] };
                if (dnitBands === 'A')
                    band = { higher: higherBandA, lower: lowerBandA };
                else if (dnitBands === 'B')
                    band = { higher: higherBandB, lower: lowerBandB };
                else if (dnitBands === 'C')
                    band = { higher: higherBandC, lower: lowerBandC };
                let sumOfPercents = [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                ];
                for (let i = 0; i < percentsOfMaterials.length; i++) {
                    for (let j = 0; j < 20; j++) {
                        let materialValue = Object.values(percentsOfMaterials[i][j])[0];
                        let materialKey = Object.keys(percentsOfMaterials[i][j])[0];
                        if (materialValue !== null) {
                            let dosageObject = percentsOfDosage.find((e) => e.hasOwnProperty(materialKey));
                            let dosageValue = null;
                            if (dosageObject) {
                                dosageValue = dosageObject[materialKey];
                            }
                            if (materialValue !== null) {
                                let value = (materialValue * dosageValue) / 100;
                                percentsOfMaterials[i][j] = { [materialKey]: value };
                                sumOfPercents[j] += percentsOfMaterials[i][j][materialKey];
                            }
                        }
                        else
                            percentsOfMaterials[i][j] = null;
                    }
                }
                tableRows.forEach((element) => {
                    Object.keys(element).forEach((keys) => {
                        const stringIndex = keys.indexOf('_');
                        const label = keys.substring(0, stringIndex);
                        const id = keys.substring(stringIndex + 1);
                        const newArray = percentsOfMaterials.map((innerArray) => innerArray.filter((value) => value !== null));
                        const index = tableRows.indexOf(element);
                        if (label === 'passant') {
                            const key = Object.keys(tableRows[index]).find((k) => k === `passant_${id}`);
                            if (key) {
                                let newArrIndex = newArray.findIndex((e) => e[0] && e[0].hasOwnProperty(id));
                                if (newArrIndex !== -1 && newArray[newArrIndex][index] && newArray[newArrIndex][index][id]) {
                                    newTableRows[index][key] = newArray[newArrIndex][index][id];
                                }
                                else {
                                    if (!newTableRows[index])
                                        newTableRows[index] = {};
                                    newTableRows[index][`total_passant_${id}`] = '---';
                                    console.log(`The id "${id}" was not found in the index ${index} of the newArray.`);
                                }
                            }
                            else {
                                if (!newTableRows[index])
                                    newTableRows[index] = {};
                                newTableRows[index][`total_passant_${id}`] = '---';
                                console.log(`The key "passant_${id}" was not found in the object at index ${index}.`);
                            }
                        }
                    });
                });
                const projections = [];
                sumOfPercents.map((e, idx) => {
                    if (e !== null) {
                        const index = idx;
                        const sieve = interfaces_1.AllSieves[index];
                        projections.push({ label: sieve.label, value: e.toFixed(2) });
                    }
                });
                sumOfPercents = this.insertBlankPointsOnCurve(sumOfPercents, axisX);
                const higherTolerance = [];
                const lowerTolerance = [];
                for (let i = 0; i < sumOfPercents.length; i++) {
                    if (sumOfPercents[i] === null) {
                        higherTolerance.push(null);
                        lowerTolerance.push(null);
                    }
                    else {
                        let upperLimit = band.higher[i];
                        let lowerLimit = band.lower[i];
                        if (i < 9) {
                            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 7);
                            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 7);
                        }
                        else if (i > 8 && i < 16) {
                            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 5);
                            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 5);
                        }
                        else if (i > 15 && i < 19) {
                            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 3);
                            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 3);
                        }
                        else if (i === 19) {
                            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 2);
                            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 2);
                        }
                        higherTolerance.push(upperLimit);
                        lowerTolerance.push(lowerLimit);
                    }
                }
                const pointsOfCurve = [];
                for (let i = 0; i < sumOfPercents.length; i++) {
                    pointsOfCurve.push([
                        axisX[i],
                        band.higher[i],
                        higherTolerance[i],
                        sumOfPercents[i],
                        lowerTolerance[i],
                        band.lower[i],
                    ]);
                }
                newTableRows.map((row) => {
                    Object.values(row).some((value) => {
                        if (value === null) {
                            Object.keys(row).forEach((key) => {
                                if (row[key] === null) {
                                    row[key] = '---';
                                }
                            });
                        }
                    });
                });
                const data = {
                    percentsOfMaterials,
                    sumOfPercents,
                    pointsOfCurve,
                    table_data: newTableRows,
                    projections,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveStep3Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save marshall granulometry composition step on granulometry-composition.marshall.service.ts > [body]', { body });
                const { name } = body.granulometryCompositionData;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                const _a = body.granulometryCompositionData, { name: materialName } = _a, granulometryCompositionWithoutName = __rest(_a, ["name"]);
                const marshallWithGranulometryComposition = Object.assign(Object.assign({}, marshallExists._doc), { granulometryCompositionData: granulometryCompositionWithoutName });
                yield this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithGranulometryComposition);
                if (marshallExists._doc.generalData.step < 3) {
                    yield this.marshallRepository.saveStep(marshallExists, 3);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    insertBlankPointsOnCurve(curve, axisX) {
        for (let k = 0; k < curve.length; k++) {
            if (curve[k] !== null) {
                for (let i = k; i < curve.length; i++) {
                    if (curve[i] === null) {
                        for (let j = i; j < curve.length; j++) {
                            if (curve[j] !== null) {
                                curve = this.findEquationOfCurve(curve, axisX, curve[i - 1], curve[j], axisX[i - 1], axisX[j], i);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return curve;
    }
    findEquationOfCurve(curve, axisX, y2, y1, x2, x1, i) {
        if (y1 !== y2) {
            let a = (y2 - y1) / (x2 - x1);
            let b = (y1 * x2 - y2 * x1) / (x2 - x1);
            curve[i] = a * axisX[i] + b;
        }
        else
            curve[i] = y1;
        return curve;
    }
};
exports.GranulometryComposition_Marshall_Service = GranulometryComposition_Marshall_Service;
exports.GranulometryComposition_Marshall_Service = GranulometryComposition_Marshall_Service = GranulometryComposition_Marshall_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.AsphaltGranulometryRepository,
        repository_2.MarshallRepository])
], GranulometryComposition_Marshall_Service);
//# sourceMappingURL=granulometry-composition.marshall.service.js.map