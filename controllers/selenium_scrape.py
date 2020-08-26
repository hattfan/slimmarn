# Headless
# from selenium import webdriver
# driver = webdriver.Chrome("C:\Program Files (x86)\chromedriver_win32\chromedriver83.exe")
# driver.get('https://google.com')

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import re

DRIVER_PATH = 'C:\Program Files (x86)\chromedriver_win32\chromedriver83.exe'
options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")

def ParseMatchiScrape(slots):
    availableTimes = re.findall("\d+", slots)[0]
    return availableTimes

driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)
driver.get("https://www.matchi.se/book/index?lat=&lng=&offset=0&outdoors=&sport=5&date=2020-06-22&q=Falkpadel")
all_links = driver.find_elements_by_tag_name('a')
slots = driver.find_element_by_id('slots_226')
parsedSlots = slots.text.replace(" ", "")
availableSlots = ParseMatchiScrape(parsedSlots)
print(availableSlots)
driver.quit()

