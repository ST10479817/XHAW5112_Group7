    
window.onload = function() {
  const savedCourses = JSON.parse(localStorage.getItem("selectedCourses")) || [];
  savedCourses.forEach(courseName => {
    const checkbox = document.querySelector(`input[name="course"][value="${courseName}"]`);
    if (checkbox) {
      checkbox.checked = true;
    }
  });
};

      function clearSelection() {
    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[name="course"]');
    checkboxes.forEach(box => box.checked = false);
    localStorage.removeItem("selectedCourses");

    // Reset the quote summary text
    document.querySelector('.quote_summary').innerHTML = `
        <p>Please select courses to see pricing and press the <strong>Calculate</strong> button.</p>
        <p>Select courses above to calculate fees.</p>
    `;
}
function calculateTotal() {
    // Select all checked courses
    const selectedCourses = document.querySelectorAll('input[name="course"]:checked');

    // If no courses selected
    if (selectedCourses.length === 0) {
        alert("Please select at least one course.");
        return;
    }

    // Calculate base total
    let total = 0;
    selectedCourses.forEach(course => {
        total += parseFloat(course.getAttribute('data-fee'));
    });

    // Apply discounts based on number of courses
    let discount = 0;
    if (selectedCourses.length === 2) {
        discount = 0.05; // 5%
    } else if (selectedCourses.length === 3) {
        discount = 0.10; // 10%
    } else if (selectedCourses.length >= 4) {
        discount = 0.15; // 15%
    }

    const discountAmount = total * discount;
    const finalTotal = total - discountAmount;

    // Create summary text
    let summary = `
        <h2>Quote Summary</h2>
        <p>Number of Courses Selected: ${selectedCourses.length}</p>
        
    `;

    selectedCourses.forEach(course => {
        summary += `<ol>${course.value} - R${course.getAttribute('data-fee')}</ol>`;
    });

    summary += `
        
        <p><strong>Subtotal:</strong> R${total.toFixed(2)}</p>
        <p><strong>Discount:</strong> R${discountAmount.toFixed(2)}</p>
        <p><strong>Total Payable:</strong> R${finalTotal.toFixed(2)}</p>
    `;

    // Display the summary in the quote_summary div
    document.querySelector('.quote_summary').innerHTML = summary;
}


function requestQuote() {
    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const summary = document.querySelector('.quote_summary').innerText;

    if (!name || !phone || !email) {
        alert("Please fill in all contact fields before requesting a quote.");
        return;
    }

    if (summary.includes("Please select courses")) {
        alert("Please calculate your quote before submitting your request.");
        return;
    }

    alert(`Thank you, ${name}! Your quote request has been submitted.\n\nWe'll contact you soon at ${email} or ${phone}.`);
    
    // Optionally clear inputs
    document.getElementById('quoteForm').reset();
}
