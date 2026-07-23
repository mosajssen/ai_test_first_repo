# Rolnopol — Test Plan

Source: http://localhost:3000/docs.html

---

## 1. Authentication

| #    | Test Case                               | Steps                                     | Expected                                 | Tags              |
| ---- | --------------------------------------- | ----------------------------------------- | ---------------------------------------- | ----------------- |
| 1.1  | Registration page loads                 | Navigate to `/register.html`              | Email and password form is visible       | @smoke @auth      |
| 1.2  | Login page loads                        | Navigate to `/login.html`                 | Login form with correct subtitle visible | @smoke @auth      |
| 1.3  | Successful registration                 | Fill unique email + password, submit      | Redirected to `/login.html`              | @smoke @auth      |
| 1.4  | Successful login                        | Login with `demo@example.com` / `demo123` | Redirected to `/profile.html`            | @smoke @auth      |
| 1.5  | Logout                                  | Click logout after login                  | Session cleared, user redirected         | @smoke @auth      |
| 1.6  | Duplicate email registration            | Submit with existing email                | Error: email already exists              | @regression @auth |
| 1.7  | Invalid credentials                     | Login with wrong password                 | Error message shown, no redirect         | @regression @auth |
| 1.8  | Protected route — unauthenticated       | Visit `/profile.html` without login       | Redirected to login page                 | @regression @auth |
| 1.9  | Registration with invalid email         | Submit with invalid email format          | Inline validation error shown            | @regression @auth |
| 1.10 | Registration with short password        | Submit with 2-char password               | Inline validation error shown            | @regression @auth |
| 1.11 | Registration with empty required fields | Submit empty form                         | Form not submitted, email field focused  | @regression @auth |

---

## 2. Farm & Resource Management

| #   | Test Case              | Steps                                                        | Expected                              | Tags                  |
| --- | ---------------------- | ------------------------------------------------------------ | ------------------------------------- | --------------------- |
| 2.1 | View farm dashboard    | Log in, go to profile                                        | Fields, animals, and staff are listed | `@smoke` `@farm`      |
| 2.2 | Add a field            | Navigate to fields section, add new field with name and area | Field appears in list                 | `@smoke` `@farm`      |
| 2.3 | Edit a field           | Select existing field, update name/area                      | Changes saved and reflected           | `@regression` `@farm` |
| 2.4 | Delete a field         | Remove an unassigned field                                   | Field removed from list               | `@regression` `@farm` |
| 2.5 | Add an animal          | Add animal with type and amount                              | Animal appears in list                | `@regression` `@farm` |
| 2.6 | Assign animal to field | Set `fieldId` on animal                                      | Animal shows field assignment         | `@regression` `@farm` |
| 2.7 | Add staff              | Add staff member with name and age                           | Staff member appears in list          | `@regression` `@farm` |
| 2.8 | Assign staff to field  | Create assignment linking staff to field                     | Assignment visible in dashboard       | `@regression` `@farm` |

---

## 3. Marketplace

| #   | Test Case                       | Steps                                            | Expected                                   | Tags                         |
| --- | ------------------------------- | ------------------------------------------------ | ------------------------------------------ | ---------------------------- |
| 3.1 | Browse marketplace              | Log in, navigate to marketplace                  | Active offers are listed                   | `@smoke` `@marketplace`      |
| 3.2 | Create offer — unassigned field | Select unassigned field, set price, submit       | Offer created with status `active`         | `@smoke` `@marketplace`      |
| 3.3 | Create offer — assigned field   | Try to sell an assigned field                    | Offer created with status `unavailable`    | `@regression` `@marketplace` |
| 3.4 | Buy an offer                    | Log in as Buyer, buy offer with sufficient funds | Ownership transferred, offer marked `sold` | `@smoke` `@marketplace`      |
| 3.5 | Cannot buy own offer            | Attempt to buy own listed offer                  | Buy action blocked                         | `@regression` `@marketplace` |
| 3.6 | Cancel offer                    | Seller cancels an active offer                   | Offer status changes to `cancelled`        | `@regression` `@marketplace` |
| 3.7 | Insufficient funds — buy        | Empty-balance user tries to buy                  | Error: "Insufficient funds"                | `@regression` `@marketplace` |

---

## 4. Financial Account

| #   | Test Case                        | Steps                                 | Expected                                      | Tags                       |
| --- | -------------------------------- | ------------------------------------- | --------------------------------------------- | -------------------------- |
| 4.1 | View balance                     | Navigate to financial account section | Current balance displayed in ROL              | `@smoke` `@financial`      |
| 4.2 | View transaction history         | Open transaction history              | List of income/expense transactions shown     | `@regression` `@financial` |
| 4.3 | Balance decreases after purchase | Buy a marketplace offer               | Balance reduced by offer price                | `@smoke` `@financial`      |
| 4.4 | Balance increases after sale     | Sell a resource via marketplace       | Balance increased by sale price               | `@smoke` `@financial`      |
| 4.5 | Transfer funds                   | Transfer ROL to another user          | Sender balance decreases, recipient increases | `@regression` `@financial` |
| 4.6 | No overdraft                     | Attempt spend exceeding balance       | Transaction blocked                           | `@regression` `@financial` |

---

## 5. System & Navigation

| #   | Test Case              | Steps                       | Expected                         | Tags                   |
| --- | ---------------------- | --------------------------- | -------------------------------- | ---------------------- |
| 5.1 | Home page              | Navigate to `/`             | Page loads with title "Rolnopol" | `@smoke` `@navigation` |
| 5.2 | Documentation page     | Navigate to `/docs.html`    | Documentation content visible    | `@smoke` `@navigation` |
| 5.3 | API Explorer (Swagger) | Navigate to `/swagger.html` | Swagger UI loads                 | `@smoke` `@navigation` |

---

## Demo Accounts

| Account    | Email                        | Password       | Notes                  |
| ---------- | ---------------------------- | -------------- | ---------------------- |
| Farmer A   | `demo@example.com`           | `demo123`      | Has resources          |
| Farmer B   | `test@example.com`           | `brownPass123` | Has resources          |
| Empty user | `emptyuser@rolnopol.demo.pl` | `demoPass123`  | No funds, no resources |
