/**
 * PicMaster API Server v2.0
 * Express server on port 3001
 * Admin Page: http://localhost:3001/admin
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// ========== Admin HTML Page ==========
const ADMIN_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>PicMaster - إدارة API Key</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Tahoma,Arial,sans-serif;background:#0a0a14;color:#e0e0f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
  .card{background:#13131f;border:1px solid #222235;border-radius:20px;padding:36px;width:100%;max-width:560px;box-shadow:0 25px 60px rgba(0,0,0,0.5)}
  .logo{font-size:40px;text-align:center;margin-bottom:12px}
  h1{text-align:center;font-size:20px;font-weight:800;color:#fff;margin-bottom:4px}
  .sub{text-align:center;font-size:12px;color:#666;margin-bottom:28px}
  label{display:block;font-size:12px;font-weight:700;color:#888;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
  input{width:100%;background:#0d0d1a;border:1px solid #2a2a45;border-radius:10px;padding:10px 14px;color:#e0e0f0;font-size:13px;outline:none;transition:border .2s;margin-bottom:16px}
  input:focus{border-color:#6c3fff}
  .btn{width:100%;padding:12px;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;margin-bottom:10px}
  .btn-primary{background:linear-gradient(135deg,#6c3fff,#3b82f6);color:#fff}
  .btn-primary:hover{opacity:.88}
  .btn-danger{background:#7f1d1d;color:#fca5a5;border:1px solid #991b1b}
  .btn-danger:hover{background:#991b1b}
  .btn-outline{background:transparent;color:#888;border:1px solid #333;font-size:12px}
  .btn-outline:hover{border-color:#6c3fff;color:#a78bfa}
  .key-box{background:#0d1f0d;border:1px solid #166534;border-radius:12px;padding:16px;margin-bottom:16px;display:none}
  .key-box.show{display:block}
  .key-label{font-size:11px;font-weight:700;color:#4ade80;margin-bottom:8px}
  .key-value{font-family:monospace;font-size:12px;color:#86efac;word-break:break-all;background:#052e16;border-radius:8px;padding:10px 12px;cursor:pointer;border:1px solid #14532d}
  .key-value:hover{border-color:#4ade80}
  .msg{padding:10px 14px;border-radius:10px;font-size:12px;font-weight:600;margin-bottom:14px;display:none}
  .msg.show{display:block}
  .msg.success{background:#052e16;border:1px solid #166534;color:#86efac}
  .msg.error{background:#2d0a0a;border:1px solid #7f1d1d;color:#fca5a5}
  .msg.info{background:#1e1a40;border:1px solid #4c1d95;color:#c4b5fd}
  .divider{border:none;border-top:1px solid #1a1a2e;margin:20px 0}
  .stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px}
  .stat{background:#0d0d1a;border:1px solid #1a1a2e;border-radius:10px;padding:12px;text-align:center}
  .stat-val{font-size:22px;font-weight:800;color:#6c3fff}
  .stat-lbl{font-size:10px;color:#555;margin-top:2px}
  .status-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-left:6px}
  .dot-on{background:#22c55e;box-shadow:0 0 6px #22c55e}
  .dot-off{background:#ef4444}
  .usage{background:#0d0d1a;border:1px solid #1a1a2e;border-radius:12px;padding:16px;margin-top:16px}
  .usage h3{font-size:12px;font-weight:700;color:#6c3fff;text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px}
  .usage ol{padding-right:16px;font-size:12px;color:#888;line-height:2}
  .usage code{background:#1a1a2e;color:#a78bfa;padding:1px 6px;border-radius:4px;font-family:monospace}
  .tip{font-size:11px;color:#f59e0b;background:#1c1407;border:1px solid #78350f;border-radius:8px;padding:10px 12px;margin-top:10px}
</style>
</head>
<body>
<div class="card">
  <div class="logo">🔑</div>
  <h1>PicMaster - إدارة API Key</h1>
  <p class="sub">سيرفر API يعمل على <code style="color:#a78bfa">http://localhost:3001</code> <span class="status-dot dot-on" id="dotStatus"></span></p>

  <div class="stats" id="statsBox">
    <div class="stat"><div class="stat-val" id="statImages">-</div><div class="stat-lbl">صورة محفوظة</div></div>
    <div class="stat"><div class="stat-val" id="statKey" style="font-size:13px">-</div><div class="stat-lbl">حالة API Key</div></div>
  </div>

  <div id="msg" class="msg"></div>
  <div id="keyBox" class="key-box">
    <div class="key-label">✅ API Key الحالي — انقر للنسخ</div>
    <div class="key-value" id="keyVal" onclick="copyKey()">-</div>
    <p style="font-size:10px;color:#555;margin-top:8px">سيتم نسخ المفتاح عند النقر عليه</p>
  </div>

  <label>كلمة مرور الأدمن</label>
  <input type="password" id="passInput" placeholder="أدخل كلمة المرور للوصول" onkeydown="if(event.key==='Enter')getKey()"/>

  <button class="btn btn-primary" onclick="generateKey()">⚡ إنشاء API Key جديد</button>
  <button class="btn btn-outline" onclick="getKey()">🔍 عرض المفتاح الحالي</button>
  <button class="btn btn-danger" onclick="revokeKey()" style="display:none" id="btnRevoke">🗑️ إلغاء API Key</button>

  <hr class="divider"/>

  <div class="usage">
    <h3>📋 كيفية الاستخدام مع الإضافة</h3>
    <ol>
      <li>انسخ API Key أعلاه</li>
      <li>افتح الإضافة في Chrome → تبويب <strong style="color:#e0e0f0">⚙️ إعدادات</strong></li>
      <li>رابط الموقع: <code>http://localhost:3001</code></li>
      <li>الصق المفتاح في حقل <strong style="color:#e0e0f0">مفتاح API</strong></li>
      <li>اضغط <strong style="color:#e0e0f0">اختبار الاتصال</strong> ✅</li>
    </ol>
    <div class="tip">⚠️ احتفظ بالمفتاح في مكان آمن. عند إنشاء مفتاح جديد يُلغى القديم تلقائياً.</div>
  </div>
</div>

<script>
const API = 'http://localhost:3001';

async function loadStats() {
  try {
    const r = await fetch(API + '/api/picmaster.php?action=test');
    const d = await r.json();
    document.getElementById('statImages').textContent = d.images_count ?? 0;
    document.getElementById('statKey').textContent = d.api_key_configured ? '✅ مُعيَّن' : '❌ غير مُعيَّن';
    document.getElementById('dotStatus').className = 'status-dot dot-on';
  } catch(e) {
    document.getElementById('dotStatus').className = 'status-dot dot-off';
  }
}

function showMsg(text, type) {
  const el = document.getElementById('msg');
  el.textContent = text;
  el.className = 'msg show ' + type;
  setTimeout(() => el.className = 'msg', 4000);
}

function showKey(key) {
  const box = document.getElementById('keyBox');
  document.getElementById('keyVal').textContent = key;
  box.classList.add('show');
  document.getElementById('btnRevoke').style.display = 'block';
}

function hideKey() {
  document.getElementById('keyBox').classList.remove('show');
  document.getElementById('btnRevoke').style.display = 'none';
}

function copyKey() {
  const key = document.getElementById('keyVal').textContent;
  navigator.clipboard.writeText(key).then(() => showMsg('✅ تم نسخ API Key!', 'success'));
}

async function getKey() {
  const pass = document.getElementById('passInput').value;
  if (!pass) { showMsg('أدخل كلمة المرور أولاً', 'error'); return; }
  try {
    const r = await fetch(API + '/api/admin/get-key', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({passphrase: pass})
    });
    const d = await r.json();
    if (d.status === 'success') {
      if (d.apiKey) { showKey(d.apiKey); showMsg('تم جلب المفتاح الحالي', 'info'); }
      else { hideKey(); showMsg('لا يوجد مفتاح — اضغط "إنشاء API Key جديد"', 'info'); }
    } else { showMsg(d.message, 'error'); }
  } catch(e) { showMsg('❌ تعذر الاتصال بالسيرفر', 'error'); }
}

async function generateKey() {
  const pass = document.getElementById('passInput').value;
  if (!pass) { showMsg('أدخل كلمة المرور أولاً', 'error'); return; }
  if (!confirm('سيتم إنشاء مفتاح جديد وإلغاء القديم. متأكد؟')) return;
  try {
    const r = await fetch(API + '/api/admin/generate-key', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({passphrase: pass})
    });
    const d = await r.json();
    if (d.status === 'success') {
      showKey(d.apiKey);
      showMsg('✅ تم إنشاء API Key جديد! انقر عليه للنسخ.', 'success');
      loadStats();
    } else { showMsg(d.message, 'error'); }
  } catch(e) { showMsg('❌ تعذر الاتصال بالسيرفر', 'error'); }
}

async function revokeKey() {
  const pass = document.getElementById('passInput').value;
  if (!pass) { showMsg('أدخل كلمة المرور أولاً', 'error'); return; }
  if (!confirm('سيتم إلغاء API Key. الإضافة لن تتمكن من النشر. متأكد؟')) return;
  try {
    const r = await fetch(API + '/api/admin/revoke-key', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({passphrase: pass})
    });
    const d = await r.json();
    if (d.status === 'success') { hideKey(); showMsg('تم إلغاء API Key', 'info'); loadStats(); }
    else { showMsg(d.message, 'error'); }
  } catch(e) { showMsg('❌ تعذر الاتصال', 'error'); }
}

loadStats();
setInterval(loadStats, 30000);
</script>
</body>
</html>`;


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

// ========== Data Files ==========
const DATA_DIR  = path.join(__dirname, 'data');
const IMAGES_FILE = path.join(DATA_DIR, 'images.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// إنشاء مجلد data إذا لم يكن موجوداً
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ========== Helpers ==========
function readJson(file, defaultVal) {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (e) { console.error('readJson error:', e.message); }
  return defaultVal;
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

function getConfig() {
  return readJson(CONFIG_FILE, { apiKey: null, adminPassphrase: 'Ahmed123123@#@#' });
}

function saveConfig(config) {
  writeJson(CONFIG_FILE, config);
}

function getImages() {
  return readJson(IMAGES_FILE, []);
}

function saveImages(images) {
  writeJson(IMAGES_FILE, images);
}

function generateApiKey() {
  return 'pk_' + crypto.randomBytes(24).toString('hex');
}

// ========== Middleware ==========
app.use(express.json({ limit: '10mb' }));

// CORS - السماح للإضافة والموقع المحلي بالوصول
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, X-Source, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

// ========== Middleware: Validate API Key ==========
function requireApiKey(req, res, next) {
  const config = getConfig();
  const key = req.headers['x-api-key'] || req.query.api_key;

  if (!config.apiKey) {
    return res.status(401).json({ status: 'error', message: 'لم يتم توليد API Key بعد. الرجاء إنشاؤه من لوحة الأدمن.' });
  }
  if (key !== config.apiKey) {
    return res.status(401).json({ status: 'error', message: 'API Key غير صحيح' });
  }
  next();
}

// ========== Routes ==========

// Test connection
app.get('/api/picmaster.php', (req, res) => {
  const action = req.query.action;
  if (action === 'test') {
    const config = getConfig();
    const images = getImages();
    res.json({
      status: 'success',
      message: 'PicMaster API Server يعمل بنجاح ✅',
      version: '2.0',
      images_count: images.length,
      api_key_configured: !!config.apiKey
    });
  } else {
    res.json({ status: 'ok' });
  }
});

// Get all images (public)
app.get('/api/images', (req, res) => {
  const images = getImages();
  res.json({ status: 'success', images, count: images.length });
});

// Add single image (requires API key)
app.post('/api/picmaster.php', requireApiKey, (req, res) => {
  const action = req.query.action;

  if (action === 'add_image') {
    const image = req.body;

    if (!image || !image.url) {
      return res.status(400).json({ status: 'error', message: 'بيانات الصورة غير مكتملة' });
    }

    const images = getImages();
    const existingIndex = images.findIndex(i => i.id === image.id);

    if (existingIndex !== -1) {
      // تحديث إذا موجود
      images[existingIndex] = { ...images[existingIndex], ...image };
    } else {
      // إضافة جديد في البداية
      images.unshift({
        ...image,
        id: image.id || ('img_' + Date.now()),
        createdAt: image.createdAt || new Date().toISOString(),
        views: 0, clicks: 0, downloads: 0
      });
    }

    saveImages(images);
    console.log(`[PicMaster] Image added: ${image.title || image.id}`);

    res.json({ status: 'success', id: image.id, total: images.length });
    return;
  }

  res.status(400).json({ status: 'error', message: 'action غير معروف' });
});

// Bulk add images (requires API key)
app.post('/api/images/bulk', requireApiKey, (req, res) => {
  const { images: newImages } = req.body;
  if (!Array.isArray(newImages) || newImages.length === 0) {
    return res.status(400).json({ status: 'error', message: 'لا توجد صور' });
  }

  const images = getImages();
  const existingIds = new Set(images.map(i => i.id));
  let added = 0;

  newImages.forEach(img => {
    if (!img.url) return;
    if (!existingIds.has(img.id)) {
      images.unshift({
        ...img,
        id: img.id || ('img_' + Date.now() + Math.random()),
        createdAt: img.createdAt || new Date().toISOString(),
        views: 0, clicks: 0, downloads: 0
      });
      existingIds.add(img.id);
      added++;
    }
  });

  saveImages(images);
  console.log(`[PicMaster] Bulk added: ${added} images`);

  res.json({ status: 'success', added, total: images.length });
});

// Delete image (requires API key)
app.delete('/api/images/:id', requireApiKey, (req, res) => {
  const images = getImages().filter(i => i.id !== req.params.id);
  saveImages(images);
  res.json({ status: 'success', total: images.length });
});

// ========== Admin Routes ==========

// Generate API Key (requires admin passphrase)
app.post('/api/admin/generate-key', (req, res) => {
  const { passphrase } = req.body;
  const config = getConfig();

  if (!passphrase || passphrase !== config.adminPassphrase) {
    return res.status(403).json({ status: 'error', message: 'كلمة المرور غير صحيحة' });
  }

  const newKey = generateApiKey();
  saveConfig({ ...config, apiKey: newKey });

  console.log('[PicMaster] New API Key generated');
  res.json({ status: 'success', apiKey: newKey });
});

// Get current API key (requires admin passphrase)
app.post('/api/admin/get-key', (req, res) => {
  const { passphrase } = req.body;
  const config = getConfig();

  if (!passphrase || passphrase !== config.adminPassphrase) {
    return res.status(403).json({ status: 'error', message: 'كلمة المرور غير صحيحة' });
  }

  res.json({ status: 'success', apiKey: config.apiKey || null });
});

// Reset / Revoke API Key (requires admin passphrase)
app.post('/api/admin/revoke-key', (req, res) => {
  const { passphrase } = req.body;
  const config = getConfig();

  if (!passphrase || passphrase !== config.adminPassphrase) {
    return res.status(403).json({ status: 'error', message: 'كلمة المرور غير صحيحة' });
  }

  saveConfig({ ...config, apiKey: null });
  res.json({ status: 'success', message: 'تم إلغاء API Key' });
});

// Get images stats (public)
app.get('/api/stats', (req, res) => {
  const images = getImages();
  res.json({
    status: 'success',
    total: images.length,
    sources: [...new Set(images.map(i => i.source || 'unknown'))].reduce((acc, s) => {
      acc[s] = images.filter(i => i.source === s).length;
      return acc;
    }, {})
  });
});

// ========== Admin Page (Standalone HTML) ==========
app.get('/admin', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(ADMIN_HTML);
});

// ========== Start Server ==========

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n========================================');
  console.log('  PicMaster API Server v2.0');
  console.log('========================================');
  console.log(`  API URL   : http://localhost:${PORT}/api`);
  console.log(`  Test URL  : http://localhost:${PORT}/api/picmaster.php?action=test`);
  console.log('========================================\n');
});
