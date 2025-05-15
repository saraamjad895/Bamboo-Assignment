# Automation Challenges - Summary

## Challenge 1: Poor performance of website sometimes

### Description:
The performance of the application was slow sometimes while login.registring which was causeing flaky tests and failure of tests. 

### Resolution:
1. **Country Selection Logic:**
   - Implemented logic to assert of success message once loaded.
   - Adjusted the waits in class where needed.


---

## Challenge 2: Varied Product Behavior on 'Add to Cart'

### Description:
The behavior of products during the 'Add to Cart' process was inconsistent. Some products required additional details, while others could be added automatically without any further information.

### Resolution:
1. **Product-Specific Handling:**
   - Implemented search product and open product detail page opening scenario from its e.
   - Fixtures can be used to pick the product variables 

---

## Challenge 3: Flakiness in Placing Orders

### Description:
Placing orders repeatedly resulted in flaky test executions, leading to inconsistencies in test outcomes.

### Resolution:
1. **Retry Strategies:**
   - Introduced retry strategies for placing orders to mitigate intermittent failures.
   - Adjusted timeouts and intervals to optimize test stability.

---

## Additional Challenges and Considerations:

### Challenge 4: Checkout Process Flows
- The complexity of the checkout process, including multi-step flows for new and exissting customer, presented challenges. Implemented robust page object models and step definitions to ensure seamless navigation.

### Challenge 5: Test Data Management
- Efficiently managing test data for scenarios with different product types and quantities required careful consideration. Implemented data-driven strategies and parameterization for optimal test coverage.
