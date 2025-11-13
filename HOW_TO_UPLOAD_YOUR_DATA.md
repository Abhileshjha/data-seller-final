# How to Upload Your Own Excel Data Files

## Problem Solved
✅ **Phone numbers are now preserved correctly** - No more altered or corrupted numbers!

## Current Status
The system now has sample Excel files with proper data formatting. Phone numbers are stored as TEXT in Excel to prevent corruption.

---

## Option 1: Replace Files Directly (Simplest)

If your Excel files already have the correct structure, simply:

1. **Rename your files** to match these exact names:
   - `yamuna-expressway-data.xlsx` (for Product 1 - ₹15)
   - `mixed-metro-data.xlsx` (for Product 2 - ₹1,299)
   - `noida-plus-data.xlsx` (for Product 3 - ₹1,799)

2. **Copy them** to: `E:\websites\3\public\downloads\`

3. **Done!** The downloads will automatically work with your data.

### ⚠️ Important: Ensure Phone Numbers are Formatted as Text
- In Excel, select the phone number column
- Right-click → Format Cells → Text
- Or add an apostrophe before each number: `'9876543210`

---

## Option 2: Use the Conversion Script (Recommended)

This script ensures data integrity, especially for phone numbers:

### Steps:

1. **Create a folder** named `your-data` in the project root:
   ```
   E:\websites\3\your-data\
   ```

2. **Place your 3 Excel files** in that folder

3. **Edit the script**: Open `scripts/convertYourData.js`
   - Update the `FILE_MAPPING` section with your actual file names:
   ```javascript
   const FILE_MAPPING = {
       'My-Yamuna-Data.xlsx': 'yamuna-expressway-data.xlsx',
       'My-Metro-Data.xlsx': 'mixed-metro-data.xlsx',
       'My-Noida-Data.xlsx': 'noida-plus-data.xlsx'
   };
   ```

4. **Run the conversion**:
   ```powershell
   node scripts/convertYourData.js
   ```

5. **Done!** Your files will be converted and placed in `public/downloads/` with proper formatting.

---

## Expected Data Structure

Your Excel files should have these columns (names can vary):
- **Name** / Customer Name / Full Name
- **Phone** / Mobile / Contact Number / Phone Number
- **Email** / Email Address
- **Location** / City / Area / Address
- **Interest** / Requirement / Looking For (optional)
- **Date** / Lead Date (optional)
- **Source** / Campaign (optional)

The conversion script will automatically detect phone columns and format them correctly!

---

## Verifying Your Data

After uploading, test the download:

1. Go to: http://localhost:3000/#/
2. Click "Buy Now" on a product
3. Complete the test payment
4. Download the Excel file
5. Open in Excel and verify:
   - ✅ Phone numbers are complete (10 digits)
   - ✅ No scientific notation (e.g., 9.8E+09)
   - ✅ All data is intact

---

## Troubleshooting

### Phone numbers showing as scientific notation?
- This happens when Excel treats numbers as numeric values
- Solution: Use Option 2 (Conversion Script) which forces text format

### Download shows old data?
- Clear browser cache (Ctrl + Shift + Delete)
- Hard refresh (Ctrl + F5)
- Or use incognito mode

### File not downloading?
- Ensure files are in `public/downloads/` folder
- Check file names match exactly (case-sensitive)
- Restart dev server: `npm run dev`

---

## Need Help?

- Sample data structure: Check the generated files in `public/downloads/`
- Script location: `scripts/convertYourData.js`
- Documentation: This file!

The system is now configured to handle your real data while preserving phone numbers and other critical information! 🎉
