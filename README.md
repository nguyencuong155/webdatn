# Website Bán Mỹ Phẩm Tích Hợp AI Chatbot

## Giới thiệu

Đây là đồ án tốt nghiệp với đề tài **Xây dựng website bán mỹ phẩm trực tuyến tích hợp chatbot AI tư vấn khách hàng**.

Hệ thống cho phép khách hàng tìm kiếm sản phẩm, xem chi tiết mỹ phẩm, thêm vào giỏ hàng, đặt hàng trực tuyến và nhận tư vấn sản phẩm thông qua chatbot AI. Ngoài ra, hệ thống còn cung cấp trang quản trị dành cho Admin để quản lý sản phẩm, danh mục, đơn hàng và người dùng.

---

## Công nghệ sử dụng

### Frontend

* ReactJS
* TypeScript
* TailwindCSS
* Vite
* Radix UI
* Lucide React

### Backend

* NodeJS
* ExpressJS
* JWT Authentication

### Database

* MongoDB
* Mongoose

### AI Chatbot

* OpenAI API / Gemini API
* LangChain
* Pinecone Vector Database

---

## Chức năng khách hàng

* Đăng ký tài khoản
* Đăng nhập / Đăng xuất
* Xem danh sách sản phẩm
* Tìm kiếm sản phẩm
* Xem chi tiết sản phẩm
* Thêm sản phẩm vào giỏ hàng
* Đặt hàng trực tuyến
* Theo dõi đơn hàng
* Chatbot AI tư vấn mỹ phẩm

---

## Chức năng quản trị

* Quản lý sản phẩm
* Quản lý danh mục sản phẩm
* Quản lý người dùng
* Quản lý đơn hàng
* Theo dõi lịch sử chatbot
* Thống kê doanh thu

---

## Cài đặt dự án

### Clone source code

```bash
git clone https://github.com/nguyencuong155/webdatn.git
```

### Cài đặt thư viện

```bash
npm install
```

### Chạy dự án

```bash
npm run dev
```

Dự án sẽ chạy tại:

```text
http://localhost:5173
```

---

## Cấu trúc thư mục

```text
src/
│
├── app/
│   ├── App.tsx
│   ├── components/
│
├── styles/
│
├── assets/
│
└── main.tsx
```

---

## Kiến trúc hệ thống

```text
ReactJS Frontend
        │
        ▼
 NodeJS + Express
        │
        ▼
     MongoDB
        │
        ▼
 AI Chatbot Service
```

---

## Tác giả

Sinh viên thực hiện: Nguyễn Cường

Đề tài: Xây dựng website bán mỹ phẩm trực tuyến tích hợp chatbot AI tư vấn khách hàng.

Trường: ......................................

Năm thực hiện: 2026
