// Script untuk memperbaiki form modal agar bisa discroll
// Jalankan dengan: node fix-modal-scroll.js

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'ManageAdmins.jsx',
  'ManageBanners.jsx',
  'ManageCategories.jsx',
  'ManageCourses.jsx',
  'ManageFeedback.jsx',
  'ManageModules.jsx',
  'ManageNotifications.jsx',
  'ManageOffline.jsx',
  'ManageProducts.jsx',
  'ManageQuizzes.jsx',
  'ManageUsers.jsx'
];

const modalPattern = /{showForm && createPortal\([^}]*document\.body\)/g;
const newModalStructure = `{showForm && createPortal(
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-2xl border border-indigo-200 shadow-2xl">
      <div className="max-h-[80vh] overflow-y-auto">
        $1
      </div>
    </div>
  </div>, document.body
)`;

filesToFix.forEach(file => {
  const filePath = path.join(__dirname, 'edu-frontend', 'src', 'view', file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Cari dan ganti pattern modal
    const updatedContent = content.replace(
      /{showForm && createPortal\(\s*<div className="fixed inset-0[^>]*>\s*<div className="bg-white[^>]*>/g,
      `{showForm && createPortal(
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-2xl border border-indigo-200 shadow-2xl">
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-2xl border border-indigo-200 shadow-2xl">`
    );
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ Fixed: ${file}`);
    } else {
      console.log(`⏭️  No changes needed: ${file}`);
    }
  }
});

console.log('✅ All modal fixes completed!');
