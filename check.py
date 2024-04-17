#библиотека для обработки
from bs4 import BeautifulSoup
import requests

#импорт html
def souping(url):

    html_text = requests.get(url).text
    
    soup = BeautifulSoup(html_text,'lxml')

    ad = soup.find('div', class_ = 'document-page__toc')
    if ad != None:
        ad1 = ad.find('ul')
        if ad1 != None:
            find_list = ad1.find_all('li')
            list_raw = find_list
        else:
            list_raw = ad
    else:
        list_raw = ad
    return list_raw
main_list_raw = souping('https://www.consultant.ru/document/cons_doc_LAW_10699/')


def cleaning_and_separation(cleaning_list):
    two = {}
    one = 0
    for i in range(len(cleaning_list)):
        dirty = str(cleaning_list[i])
        one += 1
        two[one] = {}

        clean = dirty.replace("<li>", "")
        clean = clean.replace("</li>", "")
        clean = clean.replace("<a href=", "")
        clean = clean.replace("</a", "")
        clean = clean.replace(">", "")
        n = 0
        clean = clean[n + 1:]
        prints = clean

        separation = prints.split( '"')
        link = separation[0]
        name = separation[1]
        two[one]['name'] = name
        two[one]['link'] = link
    return two

map1 = cleaning_and_separation(main_list_raw)

def cleaning(cleaning_list):
    two = {}
    one = 0
    for i in range(len(cleaning_list)):
        dirty = str(cleaning_list[i])
        one += 1
        two[one] = {}

        clean = dirty.replace("<li>", "")
        clean = clean.replace("</li>", "")
        clean = clean.replace("<a href=", "")
        clean = clean.replace("</a", "")
        clean = clean.replace(">", "")
        n = 0
        clean = clean[n + 1:]
    return clean

print('check stand by')
