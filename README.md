# customer-survey
 We set these
questions in a Kiosk inside the shop. We have 5 questions that need to be asked to every
customer in the shop. Questions are,
1. How satisfied are you with our products? (Rating type, 1-5)
2. How fair are the prices compared to similar retailers? (Rating type, 1-5)
3. How satisfied are you with the value for money of your purchase? (Rating Type, 1-5)
4. On a scale of 1-10 how would you recommend us to your friends and family? (Rating
Type, 1-10)
5. What could we do to improve our service? (Text Type)
Questions can either be in the database (or local storage) or hardcoded, but the answers must
be in the database(or local storage). Please keep in mind that new questions can be added later
and the code should not break when adding the questions. We should greet the customer with a
welcome screen. When the customer presses the start button on the welcome screen, it should
start with the first question. UI should be updated with the current question number like 1⁄5, 2⁄5
etc... After answering the question, the customer should see the next question till the last one.
They should be able to navigate to previous or next questions as they wish. Also they should be
able to skip a question. Each answer should be saved in the database(or local storage) with
some ID that uniquely identifies the question and answer. Also there should be some form of
logic to identify each customer's session. 
Once the user finishes the last question, we should ask a confirmation dialog to submit the
survey. If the user confirms it, we should set a flag as ‘COMPLETED’ in the database(or local
storage). In the end, you should have a screen to thank the customer for their time and then
show the welcome screen after 5 seconds. 
