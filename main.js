import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://dubmouyxleyttgkjyjkg.supabase.co';  
const supabaseKey = 'your_anon_key_here'; // ⛔ Replace with new safe key!
const supabase = createClient(supabaseUrl, supabaseKey);

// Setup HTML UI
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

// Add product
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = document.getElementById('productName').value.trim();
  const qty = parseInt(document.getElementById('productQty').value.trim(), 10);

  if (!name || isNaN(qty)) return;

  const { error } = await supabase.from('products').insert([{ name, qty }]);
  if (error) {
    alert('Ntibyakunze kongera igicuruzwa.');
    return;
  }

  form.reset();
  loadInventory(); // Refresh
});

// Fetch and display products
async function loadInventory() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  inventoryList.innerHTML = '';

  if (error) {
    inventoryList.innerHTML = '<li>Ntibyakunze kubona ibicuruzwa.</li>';
    return;
  }

  data.forEach(item => {
    const li = document.createElement('li');
    li.className = "flex items-center justify-between my-2";

    li.innerHTML = `
      <span>${item.name} — ${item.qty} <small class="text-sm text-gray-500">(${new Date(item.created_at).toLocaleString()})</small></span>
      <button class="text-red-600 hover:underline" data-id="${item.id}">❌</button>
    `;

    // Delete button
    li.querySelector('button').addEventListener('click', async () => {
      const { error } = await supabase.from('products').delete().eq('id', item.id);
      if (error) {
        alert("Ntibyakunze gukuraho igicuruzwa.");
        return;
      }
      loadInventory(); // Refresh after delete
    });

    inventoryList.appendChild(li);
  });
}

// ⏬ Run on page load
loadInventory();
