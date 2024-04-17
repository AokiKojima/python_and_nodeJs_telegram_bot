from bs4 import BeautifulSoup
import requests

from check import map1
from search import true_index
from check import cleaning
from check import cleaning_and_separation
from check import souping

url = 'https://www.consultant.ru/' + map1[true_index]['link']
html_text = requests.get(url).text
soup = BeautifulSoup(html_text,'lxml')
paper = soup.find('div', class_ = 'document-page__content document-page_left-padding').text
wood = souping(url)
if wood != None:
    paper2_clean = cleaning_and_separation(wood)
else:
    paper2_clean = None

paper = paper.replace("КонсультантПлюс:", "")

print(paper)
if paper2_clean != None :
    print(paper2_clean)

