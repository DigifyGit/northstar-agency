/* dashboard.js */

document.addEventListener('DOMContentLoaded', () => {
    console.log('NorthStar Dashboard Initialized');

    const clientViewBtn = document.getElementById('clientViewBtn');
    const execViewBtn = document.getElementById('execViewBtn');
    const mainContent = document.querySelector('.content');

    // View Toggle Logic
    clientViewBtn.addEventListener('click', () => {
        clientViewBtn.classList.add('active');
        execViewBtn.classList.remove('active');
        renderClientMode();
    });

    execViewBtn.addEventListener('click', () => {
        execViewBtn.classList.add('active');
        clientViewBtn.classList.remove('active');
        renderExecMode();
    });

    function renderClientMode() {
        document.getElementById('greeting').innerText = "Welcome back, José";
        document.querySelector('.hero-section p').innerText = "Architecting your return to IT leadership.";
        // Additional UI shifts
    }

    function renderExecMode() {
        document.getElementById('greeting').innerText = "Executive Intelligence";
        document.querySelector('.hero-section p').innerText = "Conversion economics and agency throughput.";
        // Shift KPIs to business metrics
    }

    // Initialize Radar Chart
    initRadarChart();
});

function initRadarChart() {
    const container = document.getElementById('radarChart');
    if (!container) return;

    // Simplified Radar Chart SVG for "WOW" effect without large libraries
    const svg = `
    <svg width="300" height="300" viewBox="0 0 300 300" style="display: block; margin: auto;">
        <defs>
            <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: var(--indigo); stop-opacity: 0.6" />
                <stop offset="100%" style="stop-color: var(--teal); stop-opacity: 0.6" />
            </linearGradient>
        </defs>
        <!-- Grids -->
        <circle cx="150" cy="150" r="100" stroke="rgba(255,255,255,0.05)" fill="none" />
        <circle cx="150" cy="150" r="75" stroke="rgba(255,255,255,0.05)" fill="none" />
        <circle cx="150" cy="150" r="50" stroke="rgba(255,255,255,0.05)" fill="none" />
        <circle cx="150" cy="150" r="25" stroke="rgba(255,255,255,0.05)" fill="none" />
        
        <!-- Axis -->
        <path d="M150 50 L150 250 M50 150 L250 150" stroke="rgba(255,255,255,0.1)" stroke-dasharray="2,2" />
        
        <!-- Data Polygon -->
        <polygon points="150,80 220,130 190,220 110,220 80,130" fill="url(#polyGrad)" stroke="var(--teal)" stroke-width="2">
            <animate attributeName="points" dur="2s" values="150,150 150,150 150,150 150,150 150,150; 150,80 220,130 190,220 110,220 80,130" repeatCount="1" />
        </polygon>
        
        <!-- Labels -->
        <text x="150" y="40" fill="var(--text-secondary)" font-size="10" text-anchor="middle">CLOUD ARCH</text>
        <text x="260" y="150" fill="var(--text-secondary)" font-size="10" text-anchor="start">DEVOPS</text>
        <text x="150" y="270" fill="var(--text-secondary)" font-size="10" text-anchor="middle">SECURITY</text>
        <text x="40" y="150" fill="var(--text-secondary)" font-size="10" text-anchor="end">PYTHON</text>
    </svg>
    `;
    container.innerHTML = svg;
}
