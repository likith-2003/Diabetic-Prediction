// App entry point and logic for GlycoPredict AI Dashboard

// Global State
let currentPage = 'home';
let currentExplorerPage = 1;
const explorerItemsPerPage = 10;
let filteredDataset = [...diabetesDataset];

// Load History from localStorage
function getHistory() {
  const history = localStorage.getItem('glycopredict_history');
  return history ? JSON.parse(history) : [];
}

function saveHistory(history) {
  localStorage.setItem('glycopredict_history', JSON.stringify(history));
}

// Reusable animated count helper
function animateValue(obj, start, end, duration, suffix = "") {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = end + suffix;
    }
  };
  window.requestAnimationFrame(step);
}

// Navigation / Routing Logic
function navigateToView(viewId) {
  // Update UI State
  document.querySelectorAll('.dashboard-view').forEach(view => {
    view.classList.remove('active');
  });
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  });

  const activeView = document.getElementById(`view-${viewId}`);
  if (activeView) activeView.classList.add('active');

  const activeLink = document.querySelector(`.sidebar-link[data-view="${viewId}"]`);
  if (activeLink) activeLink.classList.add('active');

  currentPage = viewId;

  // Update Header Title
  const titles = {
    home: "Clinical Dashboard Overview",
    dataset: "Dataset Overview & Diagnostics Explorer",
    visualization: "Interactive Data Visualizations",
    prediction: "Diabetes Risk Diagnostic Evaluator",
    model: "Predictive Model Performance Metrics",
    history: "Patient Risk Predictions Log",
    about: "About GlycoPredict AI Platform"
  };
  document.getElementById('page-title').textContent = titles[viewId] || "Dashboard";

  // Trigger Plotly Resize / Render on Navigation (essential for hidden divs container render)
  if (viewId === 'visualization') {
    renderSelectedChart();
  } else if (viewId === 'model') {
    renderModelPerformanceCharts();
  }

  // Refresh page data as needed
  if (viewId === 'home') {
    renderHomeView();
  } else if (viewId === 'dataset') {
    renderDatasetView();
  } else if (viewId === 'history') {
    renderHistoryView();
  }

  // Close mobile menu if active
  document.getElementById('sidebar').classList.remove('active');
  document.getElementById('sidebarOverlay').classList.remove('active');
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Mobile sidebar controls
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Attach navigation listeners
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      navigateToView(targetView);
    });
  });

  // Attach ripple effect to all buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
      const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
      createRipple(e, btn);
    }
  });

  // Initialize Home Dashboard
  renderHomeView();
  initPredictionForm();
  initDatasetExplorer();
});

// Button Ripple Effect
function createRipple(event, button) {
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

/* =========================================================================
   VIEW: HOME
   ========================================================================= */
function renderHomeView() {
  const history = getHistory();
  
  // Home KPIs data computation
  const totalRecords = diabetesDataset.length;
  const modelAcc = modelMetrics.accuracy;
  const predictionsMade = history.length;
  const positiveCases = diabetesDataset.filter(d => d.Outcome === 1).length;
  const negativeCases = diabetesDataset.filter(d => d.Outcome === 0).length;

  const kpiGrid = document.getElementById('home-kpi-grid');
  kpiGrid.innerHTML = `
    <div class="card card-teal kpi-card">
      <div class="kpi-info">
        <h3>Dataset Size</h3>
        <div class="kpi-value" id="kpi-dataset-size">0</div>
      </div>
      <div class="kpi-icon"><i class="fa-solid fa-folder-open"></i></div>
    </div>
    <div class="card card-green kpi-card">
      <div class="kpi-info">
        <h3>Model Accuracy</h3>
        <div class="kpi-value" id="kpi-accuracy">0%</div>
      </div>
      <div class="kpi-icon"><i class="fa-solid fa-bullseye"></i></div>
    </div>
    <div class="card card-fern kpi-card">
      <div class="kpi-info">
        <h3>Predictions Made</h3>
        <div class="kpi-value" id="kpi-predictions">0</div>
      </div>
      <div class="kpi-icon"><i class="fa-solid fa-calculator"></i></div>
    </div>
    <div class="card card-lime kpi-card">
      <div class="kpi-info">
        <h3>Positive Cases</h3>
        <div class="kpi-value" id="kpi-positive">0</div>
      </div>
      <div class="kpi-icon"><i class="fa-solid fa-virus"></i></div>
    </div>
    <div class="card card-yellow kpi-card">
      <div class="kpi-info">
        <h3>Negative Cases</h3>
        <div class="kpi-value" id="kpi-negative">0</div>
      </div>
      <div class="kpi-icon"><i class="fa-solid fa-shield-virus"></i></div>
    </div>
  `;

  // Animate Counters
  setTimeout(() => {
    animateValue(document.getElementById('kpi-dataset-size'), 0, totalRecords, 1000);
    animateValue(document.getElementById('kpi-accuracy'), 0, modelAcc, 1000, "%");
    animateValue(document.getElementById('kpi-predictions'), 0, predictionsMade, 1000);
    animateValue(document.getElementById('kpi-positive'), 0, positiveCases, 1000);
    animateValue(document.getElementById('kpi-negative'), 0, negativeCases, 1000);
  }, 100);

  // Render recent predictions table
  const recentTableBody = document.querySelector('#recent-predictions-table tbody');
  if (history.length === 0) {
    recentTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">No predictions made yet.</td></tr>`;
  } else {
    const recent = history.slice(-5).reverse();
    recentTableBody.innerHTML = recent.map(item => {
      let badgeClass = 'badge-negative';
      if (item.result.riskLevel === 'Medium Risk') badgeClass = 'badge-warning'; // Wait, let's look at styles. css
      if (item.result.riskLevel === 'High Risk') badgeClass = 'badge-positive';
      
      const badgeStyle = item.result.riskLevel === 'High Risk' ? 
        `background-color: var(--alert-red-bg); color: var(--alert-red);` : 
        (item.result.riskLevel === 'Medium Risk' ? `background-color: var(--warning-yellow-bg); color: var(--warning-yellow);` : `background-color: var(--success-green-bg); color: var(--success-green);`);

      const formattedTime = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return `
        <tr>
          <td>${formattedTime}</td>
          <td>${item.inputs.Age} yrs</td>
          <td>${item.inputs.BMI} kg/m²</td>
          <td>${item.inputs.Glucose} mg/dL</td>
          <td><span class="badge" style="${badgeStyle}">${item.result.riskLevel}</span></td>
        </tr>
      `;
    }).join('');
  }
}

/* =========================================================================
   VIEW: DATASET OVERVIEW
   ========================================================================= */
function renderDatasetView() {
  const totalRecords = diabetesDataset.length;
  const positiveCases = diabetesDataset.filter(d => d.Outcome === 1).length;
  const negativeCases = diabetesDataset.filter(d => d.Outcome === 0).length;

  const datasetKpis = document.getElementById('dataset-kpi-grid');
  datasetKpis.innerHTML = `
    <div class="card card-teal kpi-card">
      <div class="kpi-info">
        <h3>Total Cohort</h3>
        <div class="kpi-value">${totalRecords} patients</div>
      </div>
      <div class="kpi-icon"><i class="fa-solid fa-users"></i></div>
    </div>
    <div class="card card-green kpi-card">
      <div class="kpi-info">
        <h3>Diabetic Cohort</h3>
        <div class="kpi-value">${positiveCases} (${((positiveCases/totalRecords)*100).toFixed(1)}%)</div>
      </div>
      <div class="kpi-icon"><i class="fa-solid fa-circle-exclamation"></i></div>
    </div>
    <div class="card card-fern kpi-card">
      <div class="kpi-info">
        <h3>Non-Diabetic Cohort</h3>
        <div class="kpi-value">${negativeCases} (${((negativeCases/totalRecords)*100).toFixed(1)}%)</div>
      </div>
      <div class="kpi-icon"><i class="fa-solid fa-shield"></i></div>
    </div>
  `;

  // Render Stats Averages Table
  const statsTableBody = document.querySelector('#dataset-stats-table tbody');
  
  const features = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'];
  
  const overallMeans = {};
  const diabeticMeans = {};
  const nonDiabeticMeans = {};

  features.forEach(feat => {
    overallMeans[feat] = diabetesDataset.reduce((sum, item) => sum + item[feat], 0) / totalRecords;
    diabeticMeans[feat] = diabetesDataset.filter(d => d.Outcome === 1).reduce((sum, item) => sum + item[feat], 0) / positiveCases;
    nonDiabeticMeans[feat] = diabetesDataset.filter(d => d.Outcome === 0).reduce((sum, item) => sum + item[feat], 0) / negativeCases;
  });

  statsTableBody.innerHTML = features.map(feat => {
    const isDpf = feat === 'DiabetesPedigreeFunction';
    const format = val => isDpf ? val.toFixed(3) : val.toFixed(1);
    const unit = FEATURE_INFO[feat]?.unit ? ` ${FEATURE_INFO[feat].unit}` : '';

    return `
      <tr>
        <td><strong>${FEATURE_INFO[feat]?.label || feat}</strong></td>
        <td>${format(nonDiabeticMeans[feat])}${unit}</td>
        <td><span style="color: var(--primary-jungle-teal); font-weight: 600;">${format(diabeticMeans[feat])}${unit}</span></td>
        <td>${format(overallMeans[feat])}${unit}</td>
      </tr>
    `;
  }).join('');
}

// Dataset Explorer list with pagination & searching
function initDatasetExplorer() {
  const searchInput = document.getElementById('explorerSearch');
  const prevBtn = document.getElementById('explorerPrevBtn');
  const nextBtn = document.getElementById('explorerNextBtn');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    filteredDataset = diabetesDataset.filter(item => {
      return item.Age.toString().includes(query) || 
             item.Glucose.toString().includes(query) || 
             item.BMI.toString().includes(query) ||
             (item.Outcome === 1 ? 'diabetic' : 'non-diabetic').includes(query);
    });
    currentExplorerPage = 1;
    renderExplorerTable();
  });

  prevBtn.addEventListener('click', () => {
    if (currentExplorerPage > 1) {
      currentExplorerPage--;
      renderExplorerTable();
    }
  });

  nextBtn.addEventListener('click', () => {
    const maxPage = Math.ceil(filteredDataset.length / explorerItemsPerPage);
    if (currentExplorerPage < maxPage) {
      currentExplorerPage++;
      renderExplorerTable();
    }
  });

  renderExplorerTable();
}

function renderExplorerTable() {
  const tableBody = document.querySelector('#dataset-explorer-table tbody');
  const pagInfo = document.getElementById('explorerPaginationInfo');
  
  const startIdx = (currentExplorerPage - 1) * explorerItemsPerPage;
  const endIdx = Math.min(startIdx + explorerItemsPerPage, filteredDataset.length);
  
  if (filteredDataset.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center;">No matching cohort records found.</td></tr>`;
    pagInfo.textContent = "Showing 0 to 0 of 0 entries";
    return;
  }

  const pagedData = filteredDataset.slice(startIdx, endIdx);
  
  tableBody.innerHTML = pagedData.map(item => {
    const outcomeBadge = item.Outcome === 1 ? 
      `<span class="badge" style="background-color: var(--alert-red-bg); color: var(--alert-red);">Diabetic</span>` : 
      `<span class="badge" style="background-color: var(--success-green-bg); color: var(--success-green);">Healthy</span>`;
    
    return `
      <tr>
        <td>${item.Pregnancies}</td>
        <td>${item.Glucose}</td>
        <td>${item.BloodPressure}</td>
        <td>${item.SkinThickness}</td>
        <td>${item.Insulin}</td>
        <td>${item.BMI.toFixed(1)}</td>
        <td>${item.DiabetesPedigreeFunction.toFixed(3)}</td>
        <td>${item.Age}</td>
        <td>${outcomeBadge}</td>
      </tr>
    `;
  }).join('');

  pagInfo.textContent = `Showing ${startIdx + 1} to ${endIdx} of ${filteredDataset.length} entries`;
  
  document.getElementById('explorerPrevBtn').disabled = currentExplorerPage === 1;
  document.getElementById('explorerNextBtn').disabled = currentExplorerPage === Math.ceil(filteredDataset.length / explorerItemsPerPage);
}

/* =========================================================================
   VIEW: DATA VISUALIZATION
   ========================================================================= */
const chartThemeColors = ['#007F5F', '#2B9348', '#55A630', '#80B918', '#AACC00', '#BFD200', '#D4D700', '#DDDF00', '#EEEF20', '#FFFF3F'];

document.getElementById('chartTypeSelect').addEventListener('change', renderSelectedChart);

function renderSelectedChart() {
  const chartType = document.getElementById('chartTypeSelect').value;
  const container = document.getElementById('chart-display-area');
  
  // Clear layout adjustments
  container.innerHTML = "";

  if (chartType === 'heatmap') {
    renderCorrelationHeatmap(container);
  } else if (chartType === 'importance') {
    renderFeatureImportanceChart(container);
  } else if (chartType === 'histogram') {
    renderGlucoseHistogram(container);
  } else if (chartType === 'boxplot') {
    renderBmiBoxplot(container);
  } else if (chartType === 'scatter') {
    renderGlucoseBmiScatter(container);
  } else if (chartType === 'pie') {
    renderOutcomePieChart(container);
  }
}

// 1. Correlation Heatmap
function renderCorrelationHeatmap(container) {
  const features = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 'Outcome'];
  
  // Compute Pearson Correlation Matrix
  function getMean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }
  function getCorrelation(x, y) {
    const meanX = getMean(x);
    const meanY = getMean(y);
    const num = x.reduce((sum, val, idx) => sum + (val - meanX) * (y[idx] - meanY), 0);
    const den = Math.sqrt(
      x.reduce((sum, val) => sum + Math.pow(val - meanX, 2), 0) *
      y.reduce((sum, val) => sum + Math.pow(val - meanY, 2), 0)
    );
    return den === 0 ? 0 : num / den;
  }

  const matrixZ = [];
  for (let i = 0; i < features.length; i++) {
    const row = [];
    const valuesI = diabetesDataset.map(d => d[features[i]]);
    for (let j = 0; j < features.length; j++) {
      const valuesJ = diabetesDataset.map(d => d[features[j]]);
      row.push(parseFloat(getCorrelation(valuesI, valuesJ).toFixed(2)));
    }
    matrixZ.push(row);
  }

  const data = [{
    z: matrixZ,
    x: features,
    y: features,
    type: 'heatmap',
    colorscale: [
      [0, '#FFFF3F'],
      [0.3, '#AACC00'],
      [0.6, '#2B9348'],
      [1.0, '#007F5F']
    ],
    showscale: true,
    hoverongaps: false
  }];

  const layout = {
    title: {
      text: 'Pearson Correlation Matrix (Clinical Features)',
      font: { family: 'Poppins', size: 16, color: '#333' }
    },
    margin: { t: 50, r: 30, b: 80, l: 120 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: { tickfont: { family: 'Inter', size: 11 } },
    yaxis: { tickfont: { family: 'Inter', size: 11 } }
  };

  Plotly.newPlot(container, data, layout, { responsive: true, displayModeBar: false });
}

// 2. Feature Importance Bar Chart
function renderFeatureImportanceChart(container) {
  const sortedImportance = [...modelMetrics.featureImportance].reverse();
  const xValues = sortedImportance.map(f => f.importance);
  const yValues = sortedImportance.map(f => FEATURE_INFO[f.name]?.label || f.name);

  const data = [{
    type: 'bar',
    x: xValues,
    y: yValues,
    orientation: 'h',
    marker: {
      color: xValues.map((v, i) => chartThemeColors[i % chartThemeColors.length]),
      width: 1
    }
  }];

  const layout = {
    title: {
      text: 'Model Coefficients Weights (Feature Importance)',
      font: { family: 'Poppins', size: 16, color: '#333' }
    },
    margin: { t: 50, r: 30, b: 50, l: 160 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: {
      title: 'Relative Coefficient Weight',
      titlefont: { family: 'Inter', size: 12 },
      gridcolor: 'rgba(0, 127, 95, 0.05)'
    },
    yaxis: { tickfont: { family: 'Inter', size: 11 } }
  };

  Plotly.newPlot(container, data, layout, { responsive: true, displayModeBar: false });
}

// 3. Glucose distribution Histogram
function renderGlucoseHistogram(container) {
  const diabeticGlucose = diabetesDataset.filter(d => d.Outcome === 1).map(d => d.Glucose);
  const healthyGlucose = diabetesDataset.filter(d => d.Outcome === 0).map(d => d.Glucose);

  const trace1 = {
    x: healthyGlucose,
    type: 'histogram',
    name: 'Healthy Cohort',
    opacity: 0.75,
    marker: { color: '#2B9348' }
  };

  const trace2 = {
    x: diabeticGlucose,
    type: 'histogram',
    name: 'Diabetic Cohort',
    opacity: 0.75,
    marker: { color: '#007F5F' }
  };

  const data = [trace1, trace2];

  const layout = {
    title: {
      text: 'Plasma Glucose Concentration Frequency Distribution',
      font: { family: 'Poppins', size: 16, color: '#333' }
    },
    barmode: 'overlay',
    margin: { t: 50, r: 30, b: 50, l: 50 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: {
      title: 'Glucose (mg/dL)',
      titlefont: { family: 'Inter', size: 12 },
      gridcolor: 'rgba(0, 127, 95, 0.05)'
    },
    yaxis: {
      title: 'Frequency Counts',
      titlefont: { family: 'Inter', size: 12 },
      gridcolor: 'rgba(0, 127, 95, 0.05)'
    },
    legend: { font: { family: 'Inter', size: 11 } }
  };

  Plotly.newPlot(container, data, layout, { responsive: true, displayModeBar: false });
}

// 4. BMI Boxplot by Outcome
function renderBmiBoxplot(container) {
  const diabeticBmi = diabetesDataset.filter(d => d.Outcome === 1).map(d => d.BMI);
  const healthyBmi = diabetesDataset.filter(d => d.Outcome === 0).map(d => d.BMI);

  const trace1 = {
    y: healthyBmi,
    type: 'box',
    name: 'Healthy Cohort',
    marker: { color: '#55A630' },
    boxpoints: 'outliers'
  };

  const trace2 = {
    y: diabeticBmi,
    type: 'box',
    name: 'Diabetic Cohort',
    marker: { color: '#007F5F' },
    boxpoints: 'outliers'
  };

  const data = [trace1, trace2];

  const layout = {
    title: {
      text: 'Body Mass Index (BMI) Spread Analysis',
      font: { family: 'Poppins', size: 16, color: '#333' }
    },
    margin: { t: 50, r: 30, b: 50, l: 50 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    yaxis: {
      title: 'BMI (kg/m²)',
      titlefont: { family: 'Inter', size: 12 },
      gridcolor: 'rgba(0, 127, 95, 0.05)'
    },
    legend: { font: { family: 'Inter', size: 11 } }
  };

  Plotly.newPlot(container, data, layout, { responsive: true, displayModeBar: false });
}

// 5. Glucose vs BMI Scatter plot
function renderGlucoseBmiScatter(container) {
  const diabetic = diabetesDataset.filter(d => d.Outcome === 1);
  const healthy = diabetesDataset.filter(d => d.Outcome === 0);

  const trace1 = {
    x: healthy.map(d => d.Glucose),
    y: healthy.map(d => d.BMI),
    mode: 'markers',
    type: 'scatter',
    name: 'Healthy Cohort',
    marker: { color: '#2B9348', size: 8, opacity: 0.6 }
  };

  const trace2 = {
    x: diabetic.map(d => d.Glucose),
    y: diabetic.map(d => d.BMI),
    mode: 'markers',
    type: 'scatter',
    name: 'Diabetic Cohort',
    marker: { color: '#007F5F', size: 9, opacity: 0.8, line: { color: '#80B918', width: 1 } }
  };

  const data = [trace1, trace2];

  const layout = {
    title: {
      text: 'Bivariate Scatter: Glucose Concentration vs BMI',
      font: { family: 'Poppins', size: 16, color: '#333' }
    },
    margin: { t: 50, r: 30, b: 50, l: 50 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: {
      title: 'Glucose Concentration (mg/dL)',
      titlefont: { family: 'Inter', size: 12 },
      gridcolor: 'rgba(0, 127, 95, 0.05)'
    },
    yaxis: {
      title: 'BMI (kg/m²)',
      titlefont: { family: 'Inter', size: 12 },
      gridcolor: 'rgba(0, 127, 95, 0.05)'
    },
    legend: { font: { family: 'Inter', size: 11 } }
  };

  Plotly.newPlot(container, data, layout, { responsive: true, displayModeBar: false });
}

// 6. Outcome Pie Chart
function renderOutcomePieChart(container) {
  const diabeticCount = diabetesDataset.filter(d => d.Outcome === 1).length;
  const healthyCount = diabetesDataset.filter(d => d.Outcome === 0).length;

  const data = [{
    values: [healthyCount, diabeticCount],
    labels: ['Healthy Cohort', 'Diabetic Cohort'],
    type: 'pie',
    marker: {
      colors: ['#2B9348', '#007F5F']
    },
    hole: 0.4
  }];

  const layout = {
    title: {
      text: 'Cohort Diagnostic Outcome Distribution Ratio',
      font: { family: 'Poppins', size: 16, color: '#333' }
    },
    margin: { t: 50, r: 30, b: 50, l: 50 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    legend: { font: { family: 'Inter', size: 11 } }
  };

  Plotly.newPlot(container, data, layout, { responsive: true, displayModeBar: false });
}

/* =========================================================================
   VIEW: DIABETES PREDICTION
   ========================================================================= */
function initPredictionForm() {
  const form = document.getElementById('prediction-form');
  const fillNormalBtn = document.getElementById('btn-fill-normal');
  const fillDiabeticBtn = document.getElementById('btn-fill-diabetic');
  
  // Fill sample inputs
  fillNormalBtn.addEventListener('click', () => {
    document.getElementById('input-pregnancies').value = 1;
    document.getElementById('input-glucose').value = 88;
    document.getElementById('input-bp').value = 66;
    document.getElementById('input-skin').value = 21;
    document.getElementById('input-insulin').value = 64;
    document.getElementById('input-bmi').value = 24.4;
    document.getElementById('input-dpf').value = 0.342;
    document.getElementById('input-age').value = 30;
  });

  fillDiabeticBtn.addEventListener('click', () => {
    document.getElementById('input-pregnancies').value = 7;
    document.getElementById('input-glucose').value = 196;
    document.getElementById('input-bp').value = 90;
    document.getElementById('input-skin').value = 35;
    document.getElementById('input-insulin').value = 250;
    document.getElementById('input-bmi').value = 39.8;
    document.getElementById('input-dpf').value = 0.451;
    document.getElementById('input-age').value = 41;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect Input
    const inputs = {
      Pregnancies: parseInt(document.getElementById('input-pregnancies').value),
      Glucose: parseFloat(document.getElementById('input-glucose').value),
      BloodPressure: parseFloat(document.getElementById('input-bp').value),
      SkinThickness: parseFloat(document.getElementById('input-skin').value),
      Insulin: parseFloat(document.getElementById('input-insulin').value),
      BMI: parseFloat(document.getElementById('input-bmi').value),
      DiabetesPedigreeFunction: parseFloat(document.getElementById('input-dpf').value),
      Age: parseInt(document.getElementById('input-age').value)
    };

    // Trigger Predictor State Visuals
    document.getElementById('prediction-empty-state').style.display = 'none';
    document.getElementById('prediction-results').style.display = 'none';
    
    // Show loaders
    const progressCard = document.getElementById('model-progress-card');
    const progressBar = document.getElementById('model-progress-bar');
    const spinner = document.getElementById('prediction-spinner');

    progressCard.style.display = 'block';
    spinner.style.display = 'flex';
    progressBar.style.width = '0%';

    // Animate model load progress bar over 800ms
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 10;
      progressBar.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 80);

    // Run prediction after 1200ms total mock loading time
    setTimeout(() => {
      clearInterval(progressInterval);
      progressBar.style.width = '100%';
      
      // Hide loaders
      progressCard.style.display = 'none';
      spinner.style.display = 'none';

      // Execute calculation
      const result = getPrediction(inputs);

      // Render outputs
      document.getElementById('prediction-results').style.display = 'flex';
      renderGaugeChart(result.probabilityPercent);
      
      // Set risk card attributes
      const riskBadge = document.getElementById('risk-badge');
      const riskText = document.getElementById('risk-text');
      
      riskBadge.className = 'risk-badge-card'; // reset
      if (result.riskLevel === 'Low Risk') {
        riskBadge.classList.add('low-risk');
        riskText.innerHTML = `<i class="fa-solid fa-circle-check"></i> Patient at LOW RISK (Prob: ${result.probabilityPercent}%)`;
      } else if (result.riskLevel === 'Medium Risk') {
        riskBadge.classList.add('medium-risk');
        riskText.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Patient at MEDIUM RISK (Prob: ${result.probabilityPercent}%)`;
      } else {
        riskBadge.classList.add('high-risk');
        riskText.innerHTML = `<i class="fa-solid fa-radiation"></i> Patient at HIGH RISK (Prob: ${result.probabilityPercent}%)`;
      }

      // Recommendations list
      const recsList = document.getElementById('recommendations-list');
      recsList.innerHTML = result.recommendations.map(rec => `<li>${rec}</li>`).join('');

      // Add to history
      const history = getHistory();
      history.push({
        id: 'pred_' + Date.now(),
        timestamp: new Date().toISOString(),
        inputs: inputs,
        result: result
      });
      saveHistory(history);

    }, 1200);

  });
}

// 7. Dynamic Gauge Chart for probability
function renderGaugeChart(probabilityPercent) {
  const container = document.getElementById('prediction-gauge');
  container.innerHTML = "";

  const val = parseFloat(probabilityPercent);

  const data = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: val,
      title: { 
        text: "Diabetes Probability Score", 
        font: { family: 'Poppins', size: 14, color: '#666' } 
      },
      number: { 
        suffix: "%", 
        font: { family: 'Poppins', size: 30, color: '#333', weight: 'bold' } 
      },
      gauge: {
        axis: { 
          range: [0, 100], 
          tickwidth: 1, 
          tickcolor: "#333",
          tickfont: { family: 'Inter', size: 10 } 
        },
        bar: { color: "#007F5F", thickness: 0.35 },
        bgcolor: "white",
        borderwidth: 1,
        bordercolor: "rgba(0, 127, 95, 0.15)",
        steps: [
          { range: [0, 30], color: "rgba(43, 147, 72, 0.15)" }, // Low Risk green
          { range: [30, 70], color: "rgba(255, 183, 3, 0.15)" }, // Medium Risk yellow
          { range: [70, 100], color: "rgba(217, 4, 41, 0.15)" } // High Risk red
        ],
        threshold: {
          line: { color: "var(--alert-red)", width: 4 },
          thickness: 0.65,
          value: 70
        }
      }
    }
  ];

  const layout = {
    margin: { t: 30, r: 30, b: 10, l: 30 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    height: 230
  };

  Plotly.newPlot(container, data, layout, { responsive: true, displayModeBar: false });
}

/* =========================================================================
   VIEW: MODEL PERFORMANCE
   ========================================================================= */
function renderModelPerformanceCharts() {
  // Render ROC Curve
  const rocContainer = document.getElementById('roc-curve-chart');
  rocContainer.innerHTML = "";

  const traceRoc = {
    x: modelMetrics.rocCurve.fpr,
    y: modelMetrics.rocCurve.tpr,
    mode: 'lines+markers',
    name: 'Logistic Regression Model (AUC = 0.84)',
    line: { color: '#007F5F', width: 3 },
    marker: { color: '#80B918', size: 6 }
  };

  const traceRandom = {
    x: [0, 1],
    y: [0, 1],
    mode: 'lines',
    name: 'Random Chance (AUC = 0.50)',
    line: { color: '#ccc', width: 2, dash: 'dash' }
  };

  const layoutRoc = {
    margin: { t: 30, r: 30, b: 50, l: 50 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: {
      title: 'False Positive Rate (1 - Specificity)',
      titlefont: { family: 'Inter', size: 11 },
      gridcolor: 'rgba(0, 127, 95, 0.05)'
    },
    yaxis: {
      title: 'True Positive Rate (Sensitivity)',
      titlefont: { family: 'Inter', size: 11 },
      gridcolor: 'rgba(0, 127, 95, 0.05)'
    },
    legend: {
      font: { family: 'Inter', size: 10 },
      x: 0.6,
      y: 0.15
    }
  };

  Plotly.newPlot(rocContainer, [traceRoc, traceRandom], layoutRoc, { responsive: true, displayModeBar: false });
}

/* =========================================================================
   VIEW: PREDICTION HISTORY
   ========================================================================= */
function renderHistoryView() {
  const history = getHistory();
  const tableBody = document.querySelector('#history-logs-table tbody');
  const emptyIndicator = document.getElementById('history-empty-indicator');
  const clearBtn = document.getElementById('btn-clear-history');
  const exportBtn = document.getElementById('btn-export-csv');

  if (history.length === 0) {
    tableBody.parentElement.style.display = 'none';
    emptyIndicator.style.display = 'block';
    clearBtn.disabled = true;
    exportBtn.disabled = true;
    return;
  }

  tableBody.parentElement.style.display = 'table';
  emptyIndicator.style.display = 'none';
  clearBtn.disabled = false;
  exportBtn.disabled = false;

  tableBody.innerHTML = history.slice().reverse().map(item => {
    const formattedDate = new Date(item.timestamp).toLocaleString();
    
    const badgeStyle = item.result.riskLevel === 'High Risk' ? 
      `background-color: var(--alert-red-bg); color: var(--alert-red);` : 
      (item.result.riskLevel === 'Medium Risk' ? `background-color: var(--warning-yellow-bg); color: var(--warning-yellow);` : `background-color: var(--success-green-bg); color: var(--success-green);`);

    return `
      <tr id="row_${item.id}">
        <td style="font-size: 0.8rem;">${formattedDate}</td>
        <td>${item.inputs.Age}</td>
        <td>${item.inputs.Pregnancies}</td>
        <td>${item.inputs.Glucose}</td>
        <td>${item.inputs.BloodPressure}</td>
        <td>${item.inputs.BMI.toFixed(1)}</td>
        <td>${item.inputs.DiabetesPedigreeFunction.toFixed(3)}</td>
        <td><strong>${item.result.probabilityPercent}%</strong></td>
        <td><span class="badge" style="${badgeStyle}">${item.result.riskLevel}</span></td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm" onclick="recheckPrediction('${item.id}')" style="padding: 0.25rem 0.5rem;" title="Load parameters to Predictor"><i class="fa-solid fa-redo"></i></button>
            <button class="btn btn-secondary btn-sm" onclick="deleteHistoryItem('${item.id}')" style="padding: 0.25rem 0.5rem; color: var(--alert-red); border-color: var(--alert-red);" title="Delete Log"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Action: Load old parameters to evaluator
window.recheckPrediction = function(id) {
  const history = getHistory();
  const item = history.find(d => d.id === id);
  if (item) {
    navigateToView('prediction');
    document.getElementById('input-pregnancies').value = item.inputs.Pregnancies;
    document.getElementById('input-glucose').value = item.inputs.Glucose;
    document.getElementById('input-bp').value = item.inputs.BloodPressure;
    document.getElementById('input-skin').value = item.inputs.SkinThickness;
    document.getElementById('input-insulin').value = item.inputs.Insulin;
    document.getElementById('input-bmi').value = item.inputs.BMI;
    document.getElementById('input-dpf').value = item.inputs.DiabetesPedigreeFunction;
    document.getElementById('input-age').value = item.inputs.Age;
  }
};

// Action: Delete history log item
window.deleteHistoryItem = function(id) {
  let history = getHistory();
  history = history.filter(d => d.id !== id);
  saveHistory(history);
  renderHistoryView();
};

// Action: Clear all prediction records
document.getElementById('btn-clear-history').addEventListener('click', () => {
  if (confirm("Are you sure you want to clear all patient prediction logs? This action is permanent.")) {
    saveHistory([]);
    renderHistoryView();
  }
});

// Action: Export logs as CSV
document.getElementById('btn-export-csv').addEventListener('click', () => {
  const history = getHistory();
  if (history.length === 0) return;

  const headers = ['Timestamp', 'Age', 'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'CalculatedProbability', 'RiskLevel'];
  const csvRows = [headers.join(',')];

  history.forEach(item => {
    const row = [
      item.timestamp,
      item.inputs.Age,
      item.inputs.Pregnancies,
      item.inputs.Glucose,
      item.inputs.BloodPressure,
      item.inputs.SkinThickness,
      item.inputs.Insulin,
      item.inputs.BMI,
      item.inputs.DiabetesPedigreeFunction,
      item.result.probabilityPercent + '%',
      item.result.riskLevel
    ];
    csvRows.push(row.map(val => `"${val}"`).join(','));
  });

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `glycopredict_predictions_history_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
