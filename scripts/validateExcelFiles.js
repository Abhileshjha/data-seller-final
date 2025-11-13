import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const downloadsDir = path.join(__dirname, '../public/downloads');

const files = [
    'yamuna-expressway-data.xlsx',
    'mixed-metro-data.xlsx',
    'noida-plus-data.xlsx'
];

console.log('=== Excel File Validation ===\n');

files.forEach(filename => {
    console.log(`\nChecking: ${filename}`);
    const filePath = path.join(downloadsDir, filename);
    
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        
        console.log(`  ✓ Records: ${data.length}`);
        console.log(`  ✓ Sheet Name: ${sheetName}`);
        
        // Check first 3 records
        console.log(`\n  Sample Data (first 3 records):`);
        data.slice(0, 3).forEach((row, idx) => {
            console.log(`\n  Record ${idx + 1}:`);
            console.log(`    Name: ${row.Name}`);
            console.log(`    Phone: ${row.Phone} (Length: ${row.Phone.length})`);
            console.log(`    Email: ${row.Email}`);
            console.log(`    Location: ${row.Location}`);
        });
        
        // Validate phone numbers
        const invalidPhones = data.filter(row => {
            const phone = String(row.Phone);
            return phone.length !== 10 || !phone.startsWith('9');
        });
        
        if (invalidPhones.length > 0) {
            console.log(`\n  ⚠ Found ${invalidPhones.length} records with invalid phone format`);
        } else {
            console.log(`\n  ✓ All phone numbers are valid (10 digits, starting with 9)`);
        }
        
    } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
    }
});

console.log('\n\n=== Validation Complete ===\n');
