import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure downloads directory exists
const downloadsDir = path.join(__dirname, '../public/downloads');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
}

// Yamuna Expressway Data (3,500+ records)
const yamunaData = [];
const yamunaNames = ['Rajesh Kumar', 'Priya Sharma', 'Amit Verma', 'Sneha Gupta', 'Vikram Singh', 'Pooja Mishra', 'Rahul Jain', 'Neha Kapoor'];
const yamunaLocations = ['Yamuna Expressway Sector 18', 'Yamuna Expressway Sector 22D', 'Yamuna Expressway Sector 25', 'Yamuna Expressway Sector 29'];
const yamunaInterests = ['Residential Plot', 'Commercial Space', 'Studio Apartment', 'Investment Property'];

for (let i = 0; i < 3500; i++) {
    const name = yamunaNames[i % yamunaNames.length];
    // Format phone number properly with leading 9
    const phoneNum = 9800000000 + i;
    const phone = String(phoneNum);
    const email = `customer${i + 1}@example.com`;
    const location = yamunaLocations[i % yamunaLocations.length];
    const interest = yamunaInterests[i % yamunaInterests.length];
    
    yamunaData.push({
        'Sr. No.': i + 1,
        'Name': name,
        'Phone': phone,
        'Email': email,
        'Location': location,
        'Interest': interest,
        'Date': new Date(2024, 0, 1 + (i % 365)).toISOString().split('T')[0],
        'Source': 'Google Ads'
    });
}

// Mixed Metro Data (10,000+ records)
const metroData = [];
const metroNames = ['Arun Patel', 'Sunita Reddy', 'Manoj Agarwal', 'Kavita Singh', 'Suresh Kumar', 'Anita Joshi', 'Deepak Malhotra', 'Ritu Bansal'];
const metroLocations = ['Delhi Cantt', 'Rohini', 'Dwarka', 'South Delhi', 'Gurgaon Sector 56', 'Noida Sector 62', 'Greater Noida West', 'Faridabad'];
const metroInterests = ['2BHK Apartment', '3BHK Apartment', 'Villa', 'Office Space', 'Retail Shop'];

for (let i = 0; i < 10000; i++) {
    const name = metroNames[i % metroNames.length];
    // Format phone number properly with leading 9
    const phoneNum = 9700000000 + i;
    const phone = String(phoneNum);
    const email = `lead${i + 1}@example.com`;
    const location = metroLocations[i % metroLocations.length];
    const interest = metroInterests[i % metroInterests.length];
    
    metroData.push({
        'Sr. No.': i + 1,
        'Name': name,
        'Phone': phone,
        'Email': email,
        'Location': location,
        'Interest': interest,
        'Date': new Date(2024, 0, 1 + (i % 365)).toISOString().split('T')[0],
        'Source': i % 2 === 0 ? 'Google Ads' : 'Meta Ads'
    });
}

// Noida+ Data (45,000+ records)
const noidaData = [];
const noidaNames = ['Vikas Sharma', 'Meera Kapoor', 'Sandeep Gupta', 'Anjali Verma', 'Rohit Singh', 'Priyanka Jain', 'Ashok Kumar', 'Seema Mishra'];
const noidaLocations = ['Noida Sector 18', 'Noida Sector 62', 'Noida Extension', 'Greater Noida', 'Noida Sector 15', 'Ghaziabad Indirapuram', 'Ghaziabad Vaishali', 'Greater Noida West'];
const noidaInterests = ['Residential Flat', 'Commercial Office', 'Industrial Plot', 'Warehouse', 'Showroom', 'Investment'];

for (let i = 0; i < 45000; i++) {
    const name = noidaNames[i % noidaNames.length];
    // Format phone number properly with leading 9
    const phoneNum = 9600000000 + i;
    const phone = String(phoneNum);
    const email = `contact${i + 1}@example.com`;
    const location = noidaLocations[i % noidaLocations.length];
    const interest = noidaInterests[i % noidaInterests.length];
    
    noidaData.push({
        'Sr. No.': i + 1,
        'Name': name,
        'Phone': phone,
        'Email': email,
        'Location': location,
        'Interest': interest,
        'Date': new Date(2024, 0, 1 + (i % 365)).toISOString().split('T')[0],
        'Source': i % 3 === 0 ? 'Google Ads' : i % 3 === 1 ? 'Meta Ads' : 'Organic'
    });
}

// Helper function to format phone numbers as text in Excel
function formatPhoneColumn(worksheet, dataLength) {
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    // Find the Phone column (column C, index 2)
    for (let row = 1; row <= dataLength; row++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: 2 }); // Column C (Phone)
        if (worksheet[cellAddress]) {
            // Force text format by adding apostrophe prefix
            const phoneValue = worksheet[cellAddress].v;
            worksheet[cellAddress] = { t: 's', v: String(phoneValue) };
        }
    }
    // Set column widths
    worksheet['!cols'] = [
        { wch: 8 },  // Sr. No.
        { wch: 20 }, // Name
        { wch: 15 }, // Phone
        { wch: 30 }, // Email
        { wch: 30 }, // Location
        { wch: 25 }, // Interest
        { wch: 12 }, // Date
        { wch: 15 }  // Source
    ];
}

// Create workbooks and save
console.log('Generating Excel files...');

const wb1 = XLSX.utils.book_new();
const ws1 = XLSX.utils.json_to_sheet(yamunaData, { cellDates: false });
formatPhoneColumn(ws1, yamunaData.length);
XLSX.utils.book_append_sheet(wb1, ws1, 'Yamuna Expressway Leads');
XLSX.writeFile(wb1, path.join(downloadsDir, 'yamuna-expressway-data.xlsx'), { bookType: 'xlsx', cellStyles: true });
console.log('✓ Created yamuna-expressway-data.xlsx (3,500 records)');

const wb2 = XLSX.utils.book_new();
const ws2 = XLSX.utils.json_to_sheet(metroData, { cellDates: false });
formatPhoneColumn(ws2, metroData.length);
XLSX.utils.book_append_sheet(wb2, ws2, 'Mixed Metro Leads');
XLSX.writeFile(wb2, path.join(downloadsDir, 'mixed-metro-data.xlsx'), { bookType: 'xlsx', cellStyles: true });
console.log('✓ Created mixed-metro-data.xlsx (10,000 records)');

const wb3 = XLSX.utils.book_new();
const ws3 = XLSX.utils.json_to_sheet(noidaData, { cellDates: false });
formatPhoneColumn(ws3, noidaData.length);
XLSX.utils.book_append_sheet(wb3, ws3, 'Noida+ Leads');
XLSX.writeFile(wb3, path.join(downloadsDir, 'noida-plus-data.xlsx'), { bookType: 'xlsx', cellStyles: true });
console.log('✓ Created noida-plus-data.xlsx (45,000 records)');

console.log('\nAll Excel files generated successfully!');
