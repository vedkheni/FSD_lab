// Tuition Admin Panel JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializeSearch();
  initializeFilters();
  initializeFormValidation();
  initializeDeleteModal();

  console.log("Tuition Admin Panel initialized successfully!");
});

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    filterTable();
  });
}

// Filter functionality
function initializeFilters() {
  const subjectFilter = document.getElementById("subjectFilter");
  const feesFilter = document.getElementById("feesFilter");

  if (subjectFilter) {
    subjectFilter.addEventListener("change", filterTable);
  }

  if (feesFilter) {
    feesFilter.addEventListener("change", filterTable);
  }
}

// Combined filter function
function filterTable() {
  const searchInput = document.getElementById("searchInput");
  const subjectFilter = document.getElementById("subjectFilter");
  const feesFilter = document.getElementById("feesFilter");
  const table = document.getElementById("studentsTable");

  if (!table) return;

  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const subjectFilter_value = subjectFilter ? subjectFilter.value : "";
  const feesFilter_value = feesFilter ? feesFilter.value : "";

  const rows = table
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");

  let visibleCount = 0;

  Array.from(rows).forEach((row) => {
    const name = row.cells[0].textContent.toLowerCase();
    const email = row.cells[1].textContent.toLowerCase();
    const phone = row.cells[2].textContent.toLowerCase();
    const grade = row.cells[3].textContent.toLowerCase();
    const subject = row.getAttribute("data-subject");
    const fees = row.getAttribute("data-fees");

    const matchesSearch =
      !searchTerm ||
      name.includes(searchTerm) ||
      email.includes(searchTerm) ||
      phone.includes(searchTerm) ||
      grade.includes(searchTerm);

    const matchesSubject =
      !subjectFilter_value || subject === subjectFilter_value;
    const matchesFees = !feesFilter_value || fees === feesFilter_value;

    if (matchesSearch && matchesSubject && matchesFees) {
      row.style.display = "";
      visibleCount++;
    } else {
      row.style.display = "none";
    }
  });

  // Show/hide empty state if needed
  updateEmptyState(visibleCount);
}

// Update empty state message
function updateEmptyState(visibleCount) {
  const tbody = document.querySelector("#studentsTable tbody");
  if (!tbody) return;

  let emptyRow = tbody.querySelector(".empty-filter-row");

  if (visibleCount === 0) {
    if (!emptyRow) {
      emptyRow = document.createElement("tr");
      emptyRow.className = "empty-filter-row";
      emptyRow.innerHTML = `
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    No students found matching your criteria. Try adjusting your filters.
                </td>
            `;
      tbody.appendChild(emptyRow);
    }
  } else {
    if (emptyRow) {
      emptyRow.remove();
    }
  }
}

// Form validation
function initializeFormValidation() {
  const forms = document.querySelectorAll("#studentForm, #editStudentForm");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!validateForm(form)) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        setFormLoading(form, true);
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => clearFieldError(input));
    });
  });
}

// Validate entire form
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], select[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim();
  const fieldType = field.type;
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = "";

  // Clear previous errors
  clearFieldError(field);

  // Required validation
  if (field.hasAttribute("required") && !value) {
    errorMessage = "This field is required";
    isValid = false;
  }
  // Email validation
  else if (fieldType === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address";
      isValid = false;
    }
  }
  // Phone validation
  else if (fieldType === "tel" && value) {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ""))) {
      errorMessage = "Please enter a valid 10-digit phone number";
      isValid = false;
    }
  }
  // Name validation
  else if (fieldName === "name" && value) {
    if (value.length < 2) {
      errorMessage = "Name must be at least 2 characters long";
      isValid = false;
    } else if (value.length > 50) {
      errorMessage = "Name must be less than 50 characters";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      errorMessage = "Name should only contain letters and spaces";
      isValid = false;
    }
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  }

  return isValid;
}

// Show field error
function showFieldError(field, message) {
  field.classList.add("is-invalid");
  const feedback = field.parentNode.querySelector(".invalid-feedback");
  if (feedback) {
    feedback.textContent = message;
    feedback.style.display = "block";
  }
}

// Clear field error
function clearFieldError(field) {
  field.classList.remove("is-invalid");
  const feedback = field.parentNode.querySelector(".invalid-feedback");
  if (feedback) {
    feedback.style.display = "none";
  }
}

// Set form loading state
function setFormLoading(form, loading) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;

  const btnText = submitBtn.querySelector(".btn-text");
  const loadingSpinner = submitBtn.querySelector(".loading");

  if (loading) {
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = "none";
    if (loadingSpinner) loadingSpinner.style.display = "inline-block";
  } else {
    submitBtn.disabled = false;
    if (btnText) btnText.style.display = "inline";
    if (loadingSpinner) loadingSpinner.style.display = "none";
  }
}

// Delete modal functionality
function initializeDeleteModal() {
  const modal = document.getElementById("deleteModal");
  if (!modal) return;

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeDeleteModal();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeDeleteModal();
    }
  });
}

// Show delete confirmation modal
function confirmDelete(studentId, studentName) {
  const modal = document.getElementById("deleteModal");
  const message = document.getElementById("deleteMessage");
  const form = document.getElementById("deleteForm");

  if (modal && message && form) {
    message.textContent = `Are you sure you want to delete "${studentName}"? This action cannot be undone.`;
    form.action = `/delete/${studentId}?_method=DELETE`;
    modal.style.display = "block";
  }
}

// Close delete modal
function closeDeleteModal() {
  const modal = document.getElementById("deleteModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Format phone number on input
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length >= 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else if (value.length >= 3) {
    value = value.replace(/(\d{3})(\d{3})/, "$1-$2");
  }
  input.value = value;
}

// Auto-format phone inputs
document.addEventListener("DOMContentLoaded", function () {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach((input) => {
    input.addEventListener("input", () => formatPhoneNumber(input));
  });
});

// Print functionality
function printStudentList() {
  window.print();
}

// Export to CSV functionality
function exportToCSV() {
  const table = document.getElementById("studentsTable");
  if (!table) return;

  const rows = table.querySelectorAll("tr");
  const csvContent = [];

  rows.forEach((row) => {
    const cells = row.querySelectorAll("th, td");
    const rowData = [];

    cells.forEach((cell, index) => {
      // Skip actions column
      if (index !== cells.length - 1) {
        let cellText = cell.textContent.trim();
        // Handle badges - extract just the text
        const badge = cell.querySelector(".badge");
        if (badge) {
          cellText = badge.textContent.trim();
        }
        rowData.push(`"${cellText.replace(/"/g, '""')}"`);
      }
    });

    csvContent.push(rowData.join(","));
  });

  const csvString = csvContent.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `students_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + N = Add new student
  if ((e.ctrlKey || e.metaKey) && e.key === "n") {
    e.preventDefault();
    window.location.href = "/add";
  }

  // Ctrl/Cmd + H = Go home
  if ((e.ctrlKey || e.metaKey) && e.key === "h") {
    e.preventDefault();
    window.location.href = "/";
  }
});

// Show loading indicator for navigation
document.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (
    link &&
    link.href &&
    !link.href.startsWith("#") &&
    !link.href.startsWith("javascript:")
  ) {
    // Add loading class to show user that navigation is happening
    document.body.style.cursor = "wait";

    // Reset cursor after a delay (in case navigation fails)
    setTimeout(() => {
      document.body.style.cursor = "default";
    }, 3000);
  }
});

// Utility function for showing notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `alert alert-${type}`;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        min-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-in";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Add animation styles
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
