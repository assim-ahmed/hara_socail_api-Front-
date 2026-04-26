# HaraSocial - نظام الشات والتواصل الاجتماعي

## نظرة عامة

HaraSocial هو تطبيق تواصل اجتماعي متكامل يتضمن نظام شات فوري، إدارة الأصدقاء، والبحث عن المستخدمين. التطبيق مبني باستخدام **React** للواجهة الأمامية و **PHP** للواجهة الخلفية مع **WebSocket** للتواصل الفوري.

## التقنيات المستخدمة

### الواجهة الأمامية (Frontend)
- **React 18** - بناء واجهة المستخدم
- **Zustand** - إدارة الحالة (State Management)
- **Axios** - طلبات HTTP
- **Tailwind CSS** - التصميم والتنسيق
- **React Router DOM** - التنقل بين الصفحات
- **WebSocket API** - التواصل الفوري

### الواجهة الخلفية (Backend)
- **PHP 8.x** - لغة البرمجة
- **Ratchet** - مكتبة WebSocket لـ PHP
- **MySQL** - قاعدة البيانات
- **PDO** - التعامل مع قاعدة البيانات

## المميزات

### نظام المصادقة والاتصال
- تسجيل الدخول / إنشاء حساب
- اتصال WebSocket فوري بعد تسجيل الدخول
- إعادة اتصال تلقائية عند قطع الاتصال
- تحديث حالة المستخدم (متصل/غير متصل)

### نظام الشات
- إرسال واستقبال الرسائل الفورية
- حالة الكتابة (Typing indicator)
- عرض المستخدمين المتصلين
- حفظ الرسائل في قاعدة البيانات

### إدارة الأصدقاء
- إرسال طلبات الصداقة
- قبول / رفض طلبات الصداقة
- عرض قائمة الأصدقاء
- البحث عن مستخدمين جدد

### ملفات المستخدم
- عرض صفحة البروفايل
- رفع صورة شخصية
- تحديث البيانات الشخصية

## هيكلية المشروع
hara-social/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── chat/
│ │ │ │ ├── ChatComponent.jsx
│ │ │ │ └── OnlineFriends.jsx
│ │ │ ├── friends/
│ │ │ │ ├── FriendCard.jsx
│ │ │ │ ├── FriendRequests.jsx
│ │ │ │ ├── FriendRequestsList.jsx
│ │ │ │ └── SearchUsers.jsx
│ │ │ └── common/
│ │ ├── services/
│ │ │ ├── websocketService.js
│ │ │ ├── friendService.js
│ │ │ └── authService.js
│ │ ├── stores/
│ │ │ ├── chatStore.js
│ │ │ ├── friendStore.js
│ │ │ └── authStore.js
│ │ ├── App.jsx
│ │ └── index.js
│ ├── package.json
│ └── tailwind.config.js
├── backend/
│ ├── api/
│ │ ├── friends.php
│ │ ├── search.php
│ │ └── auth.php
│ ├── websocket/
│ │ ├── ChatHandler.php
│ │ └── server.php
│ ├── config/
│ │ └── database.php
│ └── vendor/
└── README.md
