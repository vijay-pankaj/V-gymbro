// Selecting elements
const navbar = document.querySelector('.navbar');

// Function to add a new row
function addRow() {
    var table = document.querySelector("#entry-Table table tbody");
    var newRow = table.insertRow(table.rows.length);
    var cells = ["name[]", "number[]", "join_date[]", "last_date[]"];

    cells.forEach(function(cellName) {
        var cell = newRow.insertCell();
        var input = document.createElement("input");
        input.type = cellName.includes("date") ? "date" : "text";
        input.name = cellName;
        if (!cellName.includes("date")) {
            input.placeholder = "enter your " + cellName.replace("[]", "").replace("_", " ");
        }
        cell.appendChild(input);
    });

    var actionCell = newRow.insertCell();
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function() {
        removeRow(this);
    };
    actionCell.appendChild(removeButton);
}

// Function to remove a row
function removeRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Function to save data locally
function saveData() {
    var tableRows = document.querySelectorAll("#entry-Table tbody tr");
    var data = [];

    tableRows.forEach(function(row) {
        var rowData = {
            name: row.cells[0].querySelector('input').value,
            number: row.cells[1].querySelector('input').value,
            join_date: row.cells[2].querySelector('input').value,
            last_date: row.cells[3].querySelector('input').value
        };
        data.push(rowData);
    });

    // Save data to localStorage
    localStorage.setItem("entryTableData", JSON.stringify(data));

    showPopupMessage("Data saved successfully.");
}

// Function to display popup message
function showPopupMessage(message) {
    var popup = document.getElementById("popupMessage");
    popup.textContent = message;
    popup.style.display = "block";
    setTimeout(function() {
        popup.style.display = "none";
    }, 3000); // Hide popup after 3 seconds
}

// Function to close the menu when a menu item is clicked (optional)
function closeMenu() {
    navbar.classList.remove('active');
}

// Event listeners for each menu item (optional)
const menuItems = document.querySelectorAll('.navbar a');
menuItems.forEach(item => {
    item.addEventListener('click', closeMenu);
});

// Function to handle resizing of the window
function handleResize() {
    // If the window width is greater than 768px, ensure that the navigation menu is visible
    if (window.innerWidth > 768) {
        navbar.classList.remove('active');
    }
}

// Event listener for window resize
window.addEventListener('resize', handleResize);

// Function to load saved data when the webpage loads
window.onload = function() {
    var savedData = localStorage.getItem("entryTableData");
    if (savedData) {
        var table = document.querySelector("#entry-Table table tbody");
        var data = JSON.parse(savedData);
        data.forEach(function(rowData) {
            var row = table.insertRow(-1);
            var nameCell = row.insertCell(0);
            var numberCell = row.insertCell(1);
            var joinDateCell = row.insertCell(2);
            var lastDateCell = row.insertCell(3);
            var actionCell = row.insertCell(4);

            nameCell.innerHTML = '<input type="text" name="name[]" value="' + rowData.name + '" />';
            numberCell.innerHTML = '<input type="text" name="number[]" value="' + rowData.number + '" />';
            joinDateCell.innerHTML = '<input type="date" name="join_date[]" value="' + rowData.join_date + '" />';
            lastDateCell.innerHTML = '<input type="date" name="last_date[]" value="' + rowData.last_date + '" />';
            actionCell.innerHTML = '<button onclick="removeRow(this)">Remove</button>';
        });
    }
};
