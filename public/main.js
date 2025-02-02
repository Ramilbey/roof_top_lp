

window.addEventListener("scroll", function () {
  const header = document.getElementById("rooftop");

  // Add or remove 'scrolled' class based on the scroll position
  if (window.scrollY > 50) {
    // Change 50 to adjust when the border appears
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.getElementById("form").addEventListener("submit", function (evt) {
  evt.preventDefault(); 
  let monthlyBill = parseFloat(document.getElementById("rmn").value);
  let location = document.getElementById("location").value;

  if (isNaN(monthlyBill) || monthlyBill <= 0) {
    alert("Please enter a valid monthly bill amount.");
    return;
  }

  const TNB_Tariff = 0.509; // RM0.509/kWh
  const SolarCostPerKwp = 3000; // RM3000/kWp
  const PeakSunHours = 3; // hours/day

  // System sizing
  let monthlyEnergy = monthlyBill / TNB_Tariff;
  let dailyEnergy = monthlyEnergy / 30;
  let systemSize = dailyEnergy / (PeakSunHours * 0.8);

  // Cost calculation
  let totalSystemCost = systemSize * SolarCostPerKwp;

  // Loan payment calculation (using the PMT formula)
  let interestRate = 0.05; // 5% interest rate
  let targetMonthlyPayment = monthlyBill * 0.7;

  let loanPayment = calculateLoanPayment(
    totalSystemCost,
    interestRate,
    targetMonthlyPayment
  );

  // Display results in the modal
  document.getElementById("results").innerHTML = `
      <h3>Results:</h3>
      <p>System Size (kWp): ${systemSize.toFixed(2)} kWp</p>
      <p>Total System Cost: RM ${totalSystemCost.toFixed(2)}</p>
      <p>Target Monthly Payment: RM ${targetMonthlyPayment.toFixed(2)}</p>
      <p>Loan Payment: RM ${loanPayment.toFixed(2)}</p>
    `;

  // Show the modal
  document.getElementById("modal").style.display = "flex";
});

// Function to calculate the loan payment
function calculateLoanPayment(P, r, targetPayment) {
  let n = 12; // loan term in months (simplified for this example)
  return (P * ((r / 12) * (1 + r / 12) ** n)) / ((1 + r / 12) ** n - 1);
}

// Close modal when clicked outside of modal content
window.onclick = function (event) {
  if (event.target === document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
};

window.addEventListener("load", function () {
  document.querySelector(".calculator").classList.add("show");
});

document
  .querySelector(".callButton")
  .addEventListener("click", async function () {
    let name = document.querySelector(".name + input").value;
    let contact = document.querySelector("#phoneEmail").value;

    if (!name || !contact) {
      alert("Please enter your name and contact details.");
      return;
    }

    // Send form data to the server
    const response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, contact }),
    });
    if (response.ok) {
      alert("Form submitted successfully!");
    } else {
      alert("An error occurred while submitting the form.");
    }
  });


