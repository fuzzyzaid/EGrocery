from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time


driver = webdriver.Chrome() 


    
driver.get("http://127.0.0.1:5500/signup.html")
# Here we are doing a signup here before checking the login test cases, since we are using session storage to store and check the value of user

firstName_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "first_name")))
lastName_input = driver.find_element(By.ID, "last_name")
phone_input = driver.find_element(By.ID, "phone")
email_input = driver.find_element(By.ID, "email")
password_input = driver.find_element(By.ID, "password")
verifyPaswword_input = driver.find_element(By.ID, "verify")
signup_button = driver.find_element(By.ID, "submit_button")

firstName_input.send_keys("Zaid")  
lastName_input.send_keys("Alam")
phone_input.send_keys("123-456-7890")  
email_input.send_keys("abc@gmail.com")  
password_input.send_keys("JS123456") 
verifyPaswword_input.send_keys("JS123456") 
usernameStore = email_input.get_attribute('value')
passwordStore = password_input.get_attribute('value')

username_store = [{'username': usernameStore,'password':passwordStore}]
username_store_json = json.dumps(username_store)
script = f"sessionStorage.setItem('Users', '{username_store_json}');"

driver.execute_script(script)
signup_button.click()

    
username_input = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "username"))
    )
password_input = driver.find_element("id", "password")
login_button = driver.find_element("id", "login_button")

username_input.send_keys("abc@gmail.com")
password_input.send_keys("JS123456")
login_button.click()


try:
     WebDriverWait(driver, 10).until(EC.url_to_be("http://127.0.0.1:5500/index.html"))
     assert driver.current_url == "http://127.0.0.1:5500/index.html"
except:
     print("Login failed!")
     
time.sleep(3)
driver.quit()

