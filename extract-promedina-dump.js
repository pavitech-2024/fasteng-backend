const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://fasteng:dHjGSHOkTHRAwTN5@fasteng.fdugqs8.mongodb.net/promedina?retryWrites=true&w=majority';
const collections = [
  { name: 'granularLayersSamples', limit: 3 },
  { name: 'stabilizedLayersSamples', limit: 3 },
  { name: 'binderAsphaltConcreteSamples', limit: 3 },
  { name: 'fwdAnalyses', limit: 3 },
  { name: 'iggAnalyses', limit: 3 },
];

(async () => {
  const conn = await mongoose.createConnection(uri, { serverSelectionTimeoutMS: 10000 }).asPromise();
  const db = conn.db;
  const existingCollections = (await db.listCollections().toArray()).map((c) => c.name);

  const result = {
    database: 'promedina',
    collectedAt: new Date().toISOString(),
    collections: [],
  };

  for (const entry of collections) {
    if (!existingCollections.includes(entry.name)) {
      result.collections.push({ name: entry.name, exists: false, count: 0, sampleDocs: [] });
      continue;
    }

    const col = db.collection(entry.name);
    const count = await col.countDocuments();
    const docs = await col.find({}).limit(entry.limit).toArray();
    result.collections.push({
      name: entry.name,
      exists: true,
      count,
      sampleDocs: docs.map((doc) => ({
        ...doc,
        _id: doc._id?.toString?.() || doc._id,
      })),
    });
  }

  const outputPath = path.join(process.cwd(), 'promedina-dump.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`Arquivo salvo em ${outputPath}`);
  console.log(JSON.stringify(result, null, 2));
  await conn.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
