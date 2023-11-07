import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import {
  employees, states, countries, cities,
  departments, companies, branches, users, pages, roles, subscriptions, finYear,
  employeeCategories, pageGroup,
  // erpservices
  partyCategories, currency, party, contentMaster, counts, yarnType,
  hsn, blend, yarn, fabricType, fabric, accessoryItem,
  accessory, color, unitOfMeasurement, payTerm, taxTerm, taxTemplate, po, gsm, looplength, design, gauge, dia,
  purchaseInwardOrReturn, size, stock, location, processMaster,
  // labservices
  labTestGroup, labTestSubGroup, labTest, labTestCondition, washCare, sampleDescriptionOne, 
  sampleDescriptionTwo, sampleDescriptionThree, brand, wash, finish, serviceLevel, submissionType, 
  onHoldReason, endUse, millOrFactory, packages, registration, labTestStandard, labTestMethod,washCareGroup, productCategory,labCode, holidays,labTestAnalyte,labTestRequirement,formula,fiberContent,sampleDescriptionFour,
  labTestResultEntry,
} from './src/routes/index.js';

import { socketMain } from './src/sockets/socket.js';

const app = express()
app.use(express.json())


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json())

const path = __dirname + '/src/views/';

app.use(express.static(path));


app.get('/', function (req, res) {
  res.sendFile(path + "index.html");
});

BigInt.prototype['toJSON'] = function () {
  return parseInt(this.toString());
};


app.use("/employees", employees);
app.use("/countries", countries);
app.use("/states", states);
app.use("/cities", cities);
app.use("/departments", departments);
app.use("/companies", companies);
app.use("/branches", branches);
app.use("/users", users);
app.use("/pages", pages);
app.use("/pageGroup", pageGroup);
app.use("/roles", roles);
app.use("/subscriptions", subscriptions);
app.use("/finYear", finYear);
app.use("/employeeCategories", employeeCategories);

app.use("/partyCategories", partyCategories);
app.use("/currency", currency);
app.use("/party", party);
app.use("/content", contentMaster);
app.use("/counts", counts);
app.use("/yarnType", yarnType);
app.use("/hsn", hsn);
app.use("/blend", blend);
app.use("/yarn", yarn);
app.use("/fabricType", fabricType);
app.use("/fabric", fabric);
app.use("/accessoryItem", accessoryItem);
app.use("/accessory", accessory);
app.use("/color", color);
app.use("/unitOfMeasurement", unitOfMeasurement);
app.use("/payTerm", payTerm);
app.use("/taxTerm", taxTerm);
app.use("/taxTemplate", taxTemplate);
app.use("/po", po)
app.use("/dia", dia)
app.use("/design", design)
app.use("/looplength", looplength)
app.use("/gsm", gsm)
app.use("/gauge", gauge)
app.use("/purchaseInwardOrReturn", purchaseInwardOrReturn)
app.use("/size", size)
app.use("/stock", stock)
app.use("/location", location)
app.use("/process", processMaster)

app.use("/labTestGroup", labTestGroup)
app.use("/labTestSubGroup", labTestSubGroup)
app.use("/labTest", labTest)
app.use("/labTestStandard", labTestStandard)
app.use("/labTestCondition", labTestCondition)
app.use("/washCare", washCare)
app.use("/sampleDescriptionOne", sampleDescriptionOne)
app.use("/sampleDescriptionTwo", sampleDescriptionTwo)
app.use("/sampleDescriptionThree", sampleDescriptionThree)
app.use("/brand", brand)
app.use("/wash", wash)
app.use("/finish", finish)
app.use("/serviceLevel", serviceLevel)
app.use("/submissionType", submissionType)
app.use("/onHoldReason", onHoldReason)
app.use("/endUse", endUse)
app.use("/millOrFactory", millOrFactory)
app.use("/packages", packages)
app.use("/registration", registration)
app.use("/labTestMethod", labTestMethod)
app.use("/washCareGroup", washCareGroup)
app.use("/productCategory", productCategory)
app.use("/labCode", labCode)
app.use("/holidays", holidays);
app.use("/labTestAnalyte",labTestAnalyte);
app.use("/labTestRequirement",labTestRequirement);
app.use("/formula",formula);
app.use("/fiberContent",fiberContent);
app.use("/sampleDescriptionFour", sampleDescriptionFour)
app.use("/labTestResultEntry",labTestResultEntry);





const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socketMain);

const PORT = process.env.PORT || 9000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

