const fs = require('fs');
const path = require('path');

function deduplicateHealthFacilities() {
  try {
    // Construct file paths using __dirname
    const inputPath = path.join(__dirname, 'dev-data', 'facilityData.json');
    const outputPath = path.join(
      __dirname,
      'dev-data',
      'health_facilities.json',
    );

    // Read the JSON file synchronously
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

    // Create a Map to store unique entries
    const uniqueEntries = new Map();

    // Iterate through the data and store unique entries
    data.forEach((entry) => {
      const key = `${entry.name.toLowerCase()}-${entry.location.lga.toLowerCase()}`;
      if (!uniqueEntries.has(key)) {
        uniqueEntries.set(key, entry);
      }
    });

    // Convert the Map values to an array
    const deduplicatedData = Array.from(uniqueEntries.values());

    // Sort the deduplicated data by name
    deduplicatedData.sort((a, b) => a.name.localeCompare(b.name));

    // Save the deduplicated data synchronously
    fs.writeFileSync(outputPath, JSON.stringify(deduplicatedData, null, 2));

    console.log(`Original number of entries: ${data.length}`);
    console.log(
      `Number of entries after deduplication: ${deduplicatedData.length}`,
    );
    console.log(`Deduplicated data saved to: ${outputPath}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

deduplicateHealthFacilities();
