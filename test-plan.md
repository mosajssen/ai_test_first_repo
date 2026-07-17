# Rolnopol — Test Plan

Source: http://localhost:3000/docs.html

---

## 1. Authentication

| #   | Test Case                         | Steps                                             | Expected                                                  |
| --- | --------------------------------- | ------------------------------------------------- | --------------------------------------------------------- |
| 1.1 | Registration page loads           | Navigate to `/register.html`                      | Form with email and password fields is visible            |
| 1.2 | Successful registration           | Fill unique email + password, submit              | Account created, user redirected to `/profile.html`       |
| 1.3 | Duplicate email registration      | Register with existing email (`demo@example.com`) | Error message shown                                       |
| 1.4 | Successful login                  | Login with `demo@example.com` / `demo123`         | Redirected to `/profile.html`, `rolnopolToken` cookie set |
| 1.5 | Invalid credentials               | Login with wrong password                         | Error message shown, no redirect                          |
| 1.6 | Logout                            | Click logout after login                          | Session cleared, redirected away from profile             |
| 1.7 | Protected route — unauthenticated | Visit `/profile.html` without login               | Redirected to login page                                  |

---

## 2. Farm & Resource Management

| #   | Test Case              | Steps                                                        | Expected                              |
| --- | ---------------------- | ------------------------------------------------------------ | ------------------------------------- |
| 2.1 | View farm dashboard    | Log in, go to profile                                        | Fields, animals, and staff are listed |
| 2.2 | Add a field            | Navigate to fields section, add new field with name and area | Field appears in list                 |
| 2.3 | Edit a field           | Select existing field, update name/area                      | Changes saved and reflected           |
| 2.4 | Delete a field         | Remove an unassigned field                                   | Field removed from list               |
| 2.5 | Add an animal          | Add animal with type and amount                              | Animal appears in list                |
| 2.6 | Assign animal to field | Set `fieldId` on animal                                      | Animal shows field assignment         |
| 2.7 | Add staff              | Add staff member with name and age                           | Staff member appears in list          |
| 2.8 | Assign staff to field  | Create assignment linking staff to field                     | Assignment visible in dashboard       |

---

## 3. Marketplace

| #   | Test Case                       | Steps                                                      | Expected                                                     |
| --- | ------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| 3.1 | Browse marketplace              | Log in, navigate to marketplace                            | Active offers are listed                                     |
| 3.2 | Create offer — unassigned field | Select unassigned field, set price, submit                 | Offer created with status `active`                           |
| 3.3 | Create offer — assigned field   | Try to sell an assigned field                              | Offer created with status `unavailable`                      |
| 3.4 | Buy an offer                    | Log in as Buyer, buy an active offer with sufficient funds | Ownership transferred, offer marked `sold`, balances updated |
| 3.5 | Cannot buy own offer            | Attempt to buy own listed offer                            | Buy action blocked                                           |
| 3.6 | Cancel offer                    | Seller cancels an active offer                             | Offer status changes to `cancelled`                          |
| 3.7 | Insufficient funds — buy        | Empty-balance user tries to buy                            | Error: "Insufficient funds"                                  |

---

## 4. Financial Account

| #   | Test Case                        | Steps                                 | Expected                                      |
| --- | -------------------------------- | ------------------------------------- | --------------------------------------------- |
| 4.1 | View balance                     | Navigate to financial account section | Current balance displayed in ROL              |
| 4.2 | View transaction history         | Open transaction history              | List of income/expense transactions shown     |
| 4.3 | Balance decreases after purchase | Buy a marketplace offer               | Balance reduced by offer price                |
| 4.4 | Balance increases after sale     | Sell a resource via marketplace       | Balance increased by sale price               |
| 4.5 | Transfer funds                   | Transfer ROL to another user          | Sender balance decreases, recipient increases |
| 4.6 | No overdraft                     | Attempt spend exceeding balance       | Transaction blocked                           |

---

## 5. System & Navigation

| #   | Test Case              | Steps                       | Expected                         |
| --- | ---------------------- | --------------------------- | -------------------------------- |
| 5.1 | Home page              | Navigate to `/`             | Page loads with title "Rolnopol" |
| 5.2 | Documentation page     | Navigate to `/docs.html`    | Documentation content visible    |
| 5.3 | API Explorer (Swagger) | Navigate to `/swagger.html` | Swagger UI loads                 |

---

## Demo Accounts

| Account    | Email                        | Password       | Notes                  |
| ---------- | ---------------------------- | -------------- | ---------------------- |
| Farmer A   | `demo@example.com`           | `demo123`      | Has resources          |
| Farmer B   | `test@example.com`           | `brownPass123` | Has resources          |
| Empty user | `emptyuser@rolnopol.demo.pl` | `demoPass123`  | No funds, no resources |
