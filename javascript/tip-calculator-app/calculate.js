const billInput = document.getElementById('totalBill');
const tipPercentageBtns = document.querySelectorAll('.btn-group .tip');
const customInput = document.getElementById('custom');
const numPeopleInput = document.getElementById('numPeople');
const tipAmountEl = document.getElementById('tipAmount');
const totalAmountEl = document.getElementById('totalAmount');
const reset = document.getElementById('reset');
let tipPercentage;

const calculateTipAndTotal = (billAmount, tipPercentage, numPeople) => {
  const totalTip = (billAmount * tipPercentage)/100;
  const totalAmount = billAmount + totalTip;

  const tipPerPerson = (totalTip/numPeople);
  const totalPerPerson = tipPerPerson + billAmount/numPeople;

  return {tip: tipPerPerson.toFixed(2), total: totalPerPerson.toFixed(2)}
}

const updateFinalUI = () => {
  const numPeople = parseInt(numPeopleInput.value);
  const billAmount = parseInt(billInput.value);
  
  reset.classList.add('selected');
  reset.disabled = false;
  
  const error = document.querySelector('.error');
  if(!numPeople){
    error.textContent = "Can't be zero";
    return;
  } 
  
  error.textContent = ''; 
  const {tip, total} = calculateTipAndTotal(billAmount, tipPercentage, numPeople);
  tipAmountEl.textContent = `$${tip}`;
  totalAmountEl.textContent = `$${total}`;
}


tipPercentageBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tipPercentage = btn.value;
    try {
      document.querySelector('.tip.selected').classList.remove('selected');
    } catch(err){
      console.log('There is none');
    }
    btn.classList.add('selected');
    updateFinalUI();
  });
});
customInput.addEventListener('input', () => {
  try {
    document.querySelector('.tip.selected').classList.remove('selected');
  } catch(err){
    console.log('There is none');
  }
  tipPercentage = customInput.value;
  updateFinalUI();
});
billInput.addEventListener('input', (e) => {
  updateFinalUI();
});
numPeopleInput.addEventListener('input', () => {
  updateFinalUI();
});

reset.addEventListener('click', () => {
  customInput.value = 0;
  billInput.value = 0;
  numPeopleInput.value = 0;
  tipAmountEl.textContent = '$0.00';
  totalAmountEl.textContent = '$0.00';
})