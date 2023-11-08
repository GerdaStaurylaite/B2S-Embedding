console.log("Practicing how to embed a dashboard!");

// let viz = new tableau.Viz(placeholderDiv, url, options);

let viz;

// Create a variable to store the Tableau Viz
let placeholderDiv = document.getElementById("tableauViz");

// Create a variable to store the URL
let url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-US&:display_count=n&:origin=viz_share_link";

// Create a variable to give viz different options
let options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};

function initViz() {
  console.log("Viz is ready");
  viz = new tableau.Viz(placeholderDiv, url, options);
}

// Listen to the content being loaded, when finished, load the viz

document.addEventListener("DOMContentLoaded", initViz);

// Find our buttons in the HTML file
let exportpdfbutton = document.getElementById("exportPDF");
let exportpptbutton = document.getElementById("exportPPT");
let filterValuesButton = document.getElementById("filterButton");

// Listen for a click
exportpdfbutton.addEventListener("click", exportPDFfunction);
exportpptbutton.addEventListener("click", exportPPTfunction);
filterValuesButton.addEventListener("click", getRangeValues);

// Function when button is clicked
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

// Get range values
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  const workbook = viz.getWorkbook();
  // console.log(workbook);

  let activeSheet = workbook.getActiveSheet();
  let sheets = activeSheet.getWorksheets();
  // console.log(sheets);

  let sheetToFilter = sheets[0];
  console.log(sheetToFilter);

  // Be able to filter now
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("viz filtered"));
}

// Create filterValuesFunction
