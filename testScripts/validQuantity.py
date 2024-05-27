from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()

# Here we are checking the validity of the quantity input

driver.get("http://127.0.0.1:5500/products.html")

quantity_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "qty-2")))

# Enter a quantity greater than 20 or a negative value to check for error and if enter valid number, 
#it will be added to cart and button color changes to grey
quantity_input.clear()
quantity_input.send_keys("25")

add_to_cart_button = driver.find_element(By.CLASS_NAME, "add_to_cart_btn")
add_to_cart_button.click()

try:
    error_message = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "zeroQuantity"))).text
    assert "Maximum quantity allowed is 20" in error_message
    print("Test passed: Error message displayed for quantity exceeding 20.")
except:
    print("Test failed: Error message not displayed for quantity exceeding 20.")

# Check if the quantity value is greater than 0
if int(quantity_input.get_attribute("value")) < 0:
    print("Test failed: Quantity value is not greater than 0.")
else:
    print("Test passed: Quantity value is greater than 0.")


time.sleep(3)
# Close the browser
driver.quit()
