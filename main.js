import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://dubmouyxleyttgkjyjkg.supabase.co';  
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1Ym1vdXl4bGV5dHRna2p5amtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNzEzNTQsImV4cCI6MjA2OTg0NzM1NH0.3qmTh-HYi0LwFHOgI8MJalVNGOASdQWry_fbxvaboiI';                        // ⬅️ replace this

const supabase = createClient(supabaseUrl, supabaseKey);
document.getElementById('app').innerHTML = `
  <div class="max-w-2xl mx-auto py-10">
    <h1 class="text-2xl font-bold text-center mb-6">🛒 Sisitemu y'Ibicuruzwa - Ava May</h1>

    <form id="productForm" class="space-y-4 bg-white p-6 shadow-md rounded">
      <input type="text" id="productName" placeholder="Izina ry'igicuruzwa" class="w-full border p-2 rounded" required />
      <input type="number" id="productQty" placeholder="Umubare" class="w-full border p-2 rounded" required />
      <button class="bg-green-600 text-white py-2 px-4 rounded" type="submit">Ongeramo</button>
    </form>

    <div class="mt-6">
      <h2 class="text-lg font-semibold">📦 Ibicuruzwa biri mu bubiko:</h2>
      <ul id="inventoryList" class="list-disc list-inside mt-2"></ul>
    </div>
  </div>
`;

const form = document.getElementById('productForm');
const inventoryList = document.getElementById('inventoryList');
let inventory = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('productName').value.trim();
  const qty = parseInt(document.getElementById('productQty').value.trim(), 10);

  if (!name || isNaN(qty)) return;

  inventory.push({ name, qty, time: new Date().toLocaleString() });
  renderInventory();

  form.reset();
});

function renderInventory() {
  inventoryList.innerHTML = '';
  inventory.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.qty} (yongewe: ${item.time})`;
    inventoryList.appendChild(li);
  });
}

