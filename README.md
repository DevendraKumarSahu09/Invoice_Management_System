# 🧾 Invoice Management System  

A **full-stack Invoice Management System** built with Django REST Framework for the backend and React for the frontend.  

![Built with Django](https://img.shields.io/badge/Backend-Django-092E20?style=for-the-badge&logo=django&logoColor=white)  
![Built with React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)  
![Deployed on Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)  

🔗 **[Live Demo](https://invoice-management-system-by-devendra.vercel.app/)**  

---

## 🚀 Features  

### Backend  
✅ **Models**:  
- **Invoice**  
  - `id`: Auto-incremented primary key  
  - `invoice_number`: Unique CharField  
  - `customer_name`: CharField  
  - `date`: DateField  
- **InvoiceDetail**  
  - `id`: Auto-incremented primary key  
  - `invoice`: ForeignKey to Invoice  
  - `description`: CharField  
  - `quantity`: Positive IntegerField  
  - `unit_price`: DecimalField  
  - `line_total`: Auto-computed DecimalField  

✅ **API Highlights**:  
- Endpoint: `/api/invoices/`  
- Methods: `GET`, `POST`, `PUT`, `DELETE`  
- Features:  
  - Create/Update invoices with details in a single request  
  - Auto-compute `line_total` and `total_amount`  
  - Pagination support for large datasets  
  - Validations with detailed error messages  

---

### Frontend  
✅ **Responsive Features**:  
- List invoices with **pagination**  
- **Create/Edit/Delete** invoices  
- Search and filter invoices easily  

✅ **Technologies Used**:  
- React with Vite  
- TailwindCSS for modern UI  

---

## 🛠️ Tech Stack  

| **Frontend**      | **Backend**          | **Database**   | **Deployment** |  
|--------------------|----------------------|----------------|----------------|  
| React, Vite, TailwindCSS | Django REST Framework | PostgreSQL    | Vercel         |  

---

## 📦 Project Setup  

### 🖼️ Frontend  

1. **Initialize React App with Vite**  
    ```bash
    npm create vite@latest frontend -- --template react
    cd frontend
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

2. **Configure TailwindCSS**  
    ```javascript
    // tailwind.config.js
    export default {
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      theme: { extend: {} },
      plugins: [],
    };
    ```

3. **Add Tailwind Directives in CSS**  
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

4. **Run Development Server**  
    ```bash
    npm run dev
    ```

5. **Deploy to Vercel**  
    Add `vercel.json`:  
    ```json
    {
      "routes": [{ "src": "/[^.]+", "dest": "/" }]
    }
    ```

---

### ⚙️ Backend  

1. **Set up the Virtual Environment**  
    ```bash
    python -m venv env
    source env/bin/activate  # For Windows: .\env\Scripts\activate
    pip install -r requirements.txt
    django-admin startproject backend
    ```

2. **Create Invoices App**  
    ```bash
    cd backend
    python manage.py startapp invoices
    ```

3. **Perform Migrations**  
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

4. **Configure `.env` for PostgreSQL**  
    ```env
    DB_NAME=""
    DB_USER=""
    DB_PWD=""
    DB_HOST=""
    DB_PORT=1212
    ```

5. **Run the Backend Server**  
    ```bash
    python manage.py runserver
    ```

6. **Deploy to Vercel**  
    Add `vercel.json`:  
    ```json
    {
      "builds": [
        { 
          "src": "backend/wsgi.py", 
          "use": "@vercel/python", 
          "config": { "maxLambda": "15mb", "runtime": "python3.10.4" }
        }
      ],
      "routes": [{ "src": "/(.*)", "dest": "backend/wsgi.py" }]
    }
    ```

---

## 🌐 Deployment  

| **Frontend**       | **Backend**        |  
|---------------------|--------------------|  
| [Frontend on Vercel](https://invoice-management-system-by-devendra.vercel.app/) | [Backend on Vercel](https://invoice-management-system-three.vercel.app/) |  

---

## 🎯 Bonus Features  

- ✅ **Unit Tests** for both frontend and backend  
- ✅ **Docker Configuration** for containerization  
- ✅ **Optional Deployment** on platforms like Heroku or Railway  

---

## 👨‍💻 Author  

**Devendra Kumar Sahu**  
📧 Email: [devendrasahu3837@gmail.com](mailto:devendrasahu3837@gmail.com)  

---

💡 *Feel free to fork, contribute, or raise issues!*  

### ⭐ **Don't forget to star the repo if you found it useful!** ⭐
