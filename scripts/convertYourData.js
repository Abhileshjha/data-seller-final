import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Script to convert your Excel files and preserve data integrity
 * 
 * Usage:
 * 1. Place your 3 Excel files in a folder (e.g., 'your-data' folder)
 * 2. Update the file paths below
 * 3. Run: node scripts/convertYourData.js
 */

// === CONFIGURE THESE PATHS ===
const YOUR_DATA_FOLDER = path.join(__dirname, '../your-data');
const OUTPUT_FOLDER = path.join(__dirname, '../public/downloads');

// Map your files to product files
const FILE_MAPPING = {
    // Replace these with your actual file names
    'your-yamuna-file.xlsx': 'yamuna-expressway-data.xlsx',
    'your-metro-file.xlsx': 'mixed-metro-data.xlsx',
    'your-noida-file.xlsx': 'noida-plus-data.xlsx'
};
// === END CONFIGURATION ===

function convertExcelFile(inputPath, outputPath, sheetName) {
    console.log(`\nProcessing: ${path.basename(inputPath)}`);
    
    // Read the Excel file
    const workbook = XLSX.readFile(inputPath, { cellText: false, cellDates: false });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: '' });
    console.log(`  → Found ${data.length} records`);
    
    // Detect phone number column
    const firstRow = data[0];
    const phoneColumn = Object.keys(firstRow).find(key => 
        key.toLowerCase().includes('phone') || 
        key.toLowerCase().includes('mobile') ||
        key.toLowerCase().includes('number')
    );
    
    if (phoneColumn) {
        console.log(`  → Phone column detected: "${phoneColumn}"`);
        // Ensure all phone numbers are strings
        data.forEach(row => {
            if (row[phoneColumn]) {
                row[phoneColumn] = String(row[phoneColumn]).replace(/[^0-9]/g, '');
            }
        });
    }
    
    // Create new workbook
    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(data, { cellDates: false });
    
    // Format phone column as text
    if (phoneColumn) {
        const range = XLSX.utils.decode_range(newWorksheet['!ref']);
        const phoneColIndex = Object.keys(firstRow).indexOf(phoneColumn);
        
        for (let row = 1; row <= data.length; row++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: phoneColIndex });
            if (newWorksheet[cellAddress]) {
                // Force text format
                const value = newWorksheet[cellAddress].v;
                newWorksheet[cellAddress] = { t: 's', v: String(value) };
            }
        }
    }
    
    // Set column widths for better readability
    const colWidths = Object.keys(firstRow).map(key => {
        if (key.toLowerCase().includes('email')) return { wch: 30 };
        if (key.toLowerCase().includes('phone')) return { wch: 15 };
        if (key.toLowerCase().includes('location') || key.toLowerCase().includes('address')) return { wch: 30 };
        return { wch: 20 };
    });
    newWorksheet['!cols'] = colWidths;
    
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);
    
    // Save with proper options
    XLSX.writeFile(newWorkbook, outputPath, { 
        bookType: 'xlsx', 
        cellStyles: true,
        bookSST: true
    });
    
    console.log(`  ✓ Saved to: ${path.basename(outputPath)}`);
}

// Main execution
console.log('=== Excel Data Conversion Tool ===\n');
console.log('This tool will convert your Excel files and preserve data integrity.\n');

// Ensure output folder exists
if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
}

// Check if source folder exists
if (!fs.existsSync(YOUR_DATA_FOLDER)) {
    console.log(`❌ Folder not found: ${YOUR_DATA_FOLDER}`);
    console.log('\nPlease:');
    console.log('1. Create a folder named "your-data" in the project root');
    console.log('2. Place your 3 Excel files in that folder');
    console.log('3. Update the FILE_MAPPING in this script with your file names');
    console.log('4. Run this script again\n');
    process.exit(1);
}

// Process each file
let processed = 0;
for (const [sourceFile, targetFile] of Object.entries(FILE_MAPPING)) {
    const sourcePath = path.join(YOUR_DATA_FOLDER, sourceFile);
    const outputPath = path.join(OUTPUT_FOLDER, targetFile);
    
    if (fs.existsSync(sourcePath)) {
        try {
            const sheetName = targetFile.includes('yamuna') ? 'Yamuna Expressway Leads' :
                            targetFile.includes('metro') ? 'Mixed Metro Leads' :
                            'Noida+ Leads';
            
            convertExcelFile(sourcePath, outputPath, sheetName);
            processed++;
        } catch (error) {
            console.log(`  ❌ Error processing ${sourceFile}:`, error.message);
        }
    } else {
        console.log(`⚠ File not found: ${sourceFile}`);
    }
}

console.log(`\n=== Conversion Complete ===`);
console.log(`Processed ${processed} file(s)`);
console.log('\nYour data files are ready in: public/downloads/\n');
