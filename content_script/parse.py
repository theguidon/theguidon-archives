import sys
import json

content = []

while True:
  section = input().strip()

  if section == 'END':
    break

  if section != '':
    num_articles = int(input().strip())

    articles = []
    for i in range(num_articles):
      page_num = int(input().strip())
      title = input().strip()
      bylines = input().strip()
      input() # extra space for formatting
      
      articles.append({
        'page': page_num,
        'title': title,
        'bylines': bylines,
      })

    content.append({
      'name': section,
      'articles': articles,
    })


json_str = json.dumps(
  content,
  # indent=2,
  separators=(',', ':'),
  ensure_ascii=False
)
print(json_str)