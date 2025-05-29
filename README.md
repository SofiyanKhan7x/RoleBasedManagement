# RoleBasedManagement

A Spring Boot application implementing secure JWT-based authentication and role-based access control (RBAC). It features a multi-level user hierarchy and allows role-specific CRUD operations.

---

## 🔐 Features

- ✅ JWT Authentication & Authorization
- 🔐 Secure password encryption with BCrypt
- 👤 Role-based access control
- 🧱 User hierarchy:
  - Admins can manage Managers and Cashiers
  - Managers can manage their own Cashiers and Staff
- 🛠️ RESTful APIs for all operations
- 📦 Clean, modular, and scalable architecture

---

## 🧑‍💻 Roles and Permissions

| Role     | Can Manage                      |
|----------|----------------------------------|
| Admin    | Managers, Cashiers              |
| Manager  | Own Cashiers, Own Staff         |
| Cashier  | View Access (customizable)      |
| Staff    | Limited/Read-only (optional)    |

---

## ⚙️ Tech Stack

- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- Maven
- BCrypt for password encryption

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven
- MySQL or H2 Database (update `application.properties`)

### Installation

```bash
git clone https://github.com/yourusername/RoleBasedManagement.git
cd RoleBasedManagement
mvn clean install
