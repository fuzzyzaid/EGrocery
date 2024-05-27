from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()

driver.get("http://127.0.0.1:5500/signup.html")

# We are taking all the inputs and then verifying if it is valid or not

firstName_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "first_name")))
lastName_input = driver.find_element(By.ID, "last_name")
phone_input = driver.find_element(By.ID, "phone")
email_input = driver.find_element(By.ID, "email")
password_input = driver.find_element(By.ID, "password")
verifyPaswword_input = driver.find_element(By.ID, "verify")
signup_button = driver.find_element(By.ID, "submit_button")

# Here we are sending all valid data, we can manipulate the data to check for the errors like phone no. 123456789 , no - or password less than 8 characters
firstName_input.send_keys("Zaid")  
lastName_input.send_keys("Alam")
phone_input.send_keys("123-456-7890")  
email_input.send_keys("z@gmail.com")  
password_input.send_keys("12345678") 
verifyPaswword_input.send_keys("12345678") 

signup_button.click()

try:
    WebDriverWait(driver, 10).until( EC.url_to_be("http://127.0.0.1:5500/login.html/"))  
    assert driver.current_url == "http://127.0.0.1:5500/login.html/"
except:
    print("Registration failed!")

driver.quit()
