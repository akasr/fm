document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("myRange");
  const billing = document.getElementById("billing");

  // Initial update of slider background
  updateSliderBackground();
  // Update slider background when value changes
  slider.addEventListener("input", () => {
    updateSliderBackground();
    updateNumbers();
  });

  // Update numbers when billing checkbox changes
  billing.addEventListener("input", () => {
    updateNumbers();
  });
});

function updateSliderBackground() {
  const slider = document.getElementById("myRange");

  // Calculate percentage of range
  const value = slider.value;
  const min = slider.min || 0;
  const max = slider.max || 200;
  const percentage = calculatePercentageFromRange(value, min, max);

  // Set CSS variable for track styling
  document.documentElement.style.setProperty(
    "--slider-percentage",
    `${percentage}%`
  );

  // Set background with gradient to create fill effect
  slider.style.backgroundImage = `linear-gradient(to right, 
      var(--color-soft-cyan) 0%, 
      var(--color-soft-cyan) ${percentage}%, 
      var(--color-light-grayish-blue-1) ${percentage}%, 
      var(--color-light-grayish-blue-1) 100%)`;
}

function updateNumbers() {
  const views = document.getElementById("views");
  const price = document.getElementById("price");
  const slider = document.getElementById("myRange");
  
  views.textContent = Math.round(calculatePercentageFromRange(slider.value)*2);
  price.textContent = `$${(calculatePercentageFromRange(slider.value)*0.32).toFixed(2)}`;

  const billing = document.getElementById("billing");
  if (billing.checked) {
    price.textContent = `$${(calculatePercentageFromRange(slider.value)*0.32*0.75).toFixed(2)}`;
  }
}

function calculatePercentageFromRange(value, min = 0, max = 200) {
  return ((value - min) / (max - min)) * 100;
}