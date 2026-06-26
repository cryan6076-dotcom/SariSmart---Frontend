export const exportToCSV = (data, filename = "report.csv") => {
  if (!data || !data.length) {
    alert("No data available to export!");
    return;
  }

  // 1. Extract headers from the keys of the first object
  const headers = Object.keys(data[0]);
  
  // 2. Format rows and handle commas/quotes inside strings
  const csvRows = [
    headers.join(","), // Header row
    ...data.map(row => 
      headers.map(fieldName => {
        const value = row[fieldName] === undefined || row[fieldName] === null ? "" : row[fieldName];
        const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
        // Escape existing double quotes by doubling them up, then wrap the whole value in quotes
        return `"${stringValue.replace(/"/g, '""')}"`;
      })
      .join(",")
    )
  ];

  const csvContent = csvRows.join("\n");

  // 3. Create a download link in the browser memory
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};