from selenium import webdriver
import time 
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys  
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
s=Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=s)
driver.maximize_window()
driver.delete_all_cookies()  
driver.get('http://127.0.0.1:8005') 
time.sleep(10)
driver.find_element_by_xpath("//a[contains(text(),'Sign In')]").click()  
time.sleep(10)   
driver.find_element_by_xpath("//header/div[1]/form[1]/div[1]/input[1]").send_keys('Gaurav_incorrect_username') #incorrect username
time.sleep(10)   
driver.find_element_by_xpath("//header/div[1]/form[1]/div[1]/input[2]").send_keys('1020') 
time.sleep(10)   
driver.find_element_by_xpath("//button[contains(text(),'Login')]").click()  
time.sleep(10)   
driver.find_element_by_xpath("//header/div[1]/form[1]/div[1]/input[1]").send_keys('Gaurav') 
time.sleep(10)   
driver.find_element_by_xpath("//header/div[1]/form[1]/div[1]/input[2]").send_keys('102030_incorrect_password') #incorrect password
time.sleep(10)   
driver.find_element_by_xpath("//button[contains(text(),'Login')]").click()  
time.sleep(10)   
driver.find_element_by_xpath("//header/div[1]/form[1]/div[1]/input[1]").send_keys('Gaurav') #correct username and password
time.sleep(10)   
driver.find_element_by_xpath("//header/div[1]/form[1]/div[1]/input[2]").send_keys('102030') 
time.sleep(10)   
driver.find_element_by_xpath("//button[contains(text(),'Login')]").click()  
time.sleep(10)
driver.find_element_by_xpath("//a[contains(text(),'Sign Out')]").click()
driver.close()