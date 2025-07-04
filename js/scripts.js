function getMonthlyData() {
    var months = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    var data = months.map(function (month) {
        var income = parseFloat(document.getElementById("income-" + month).value) || 0;
        var expenses = parseFloat(document.getElementById("expenses-" + month).value) || 0;

        return { month: month, income: income, expenses: expenses };
    });

    return data;
}

document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById("barChart").getContext("2d");

    // Initialize the Chart.js bar chart
    var myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            datasets: [
                {
                    label: "Income",
                    data: [], // Empty initially, will be updated dynamically
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Expenses",
                    data: [], // Empty initially, will be updated dynamically
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Function to update the chart data
    function updateChartData() {
        var monthlyData = getMonthlyData(); // Retrieve income and expenses data

        // Extract income and expenses arrays
        var incomeData = monthlyData.map(function (item) { return item.income; });
        var expensesData = monthlyData.map(function (item) { return item.expenses; });

        // Update the chart datasets
        myChart.data.datasets[0].data = incomeData; // Update income dataset
        myChart.data.datasets[1].data = expensesData; // Update expenses dataset

        // Refresh the chart to reflect the new data
        myChart.update();
    }

    // Add an event listener to the "chart" tab
    var chartTab = document.getElementById("chart-tab");
    chartTab.addEventListener("click", function () {
        updateChartData(); // Update the chart data when the "chart" tab is clicked
    });

    // Add an event listener to the "Download" button
    var downloadButton = document.getElementById("download");
    downloadButton.addEventListener("click", function () {
        downloadCanvasAsImage("barChart", "chart.png"); // Download the canvas as an image
    });
});


function downloadCanvasAsImage(canvasId, fileName) {
    var canvas = document.getElementById(canvasId);
    var image = canvas.toDataURL("image/png"); // Convert canvas to data URL (PNG format)

    var link = document.createElement("a");
    link.href = image;
    link.download = fileName; // Set the file name for the download
    link.click(); // Trigger the download
}

//input with id "username" on chnage
document.getElementById("username").addEventListener("input", function () {
    var username = document.getElementById("username").value;
    //regax to check if username has atleast 1 capital letter, 1 sepcial character, 1 number and is at least 8 characters long
    var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(username)) {
        document.getElementById("username").style.borderColor = "green"; // Valid username
    }
    else {
        document.getElementById("username").style.borderColor = "red"; // Invalid username
    }
});