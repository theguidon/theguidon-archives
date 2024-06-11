import sys
import json
import re
import argparse


parser = argparse.ArgumentParser()
parser.add_argument('--t', action=argparse.BooleanOptionalAction)
parser.add_argument('--i', action=argparse.BooleanOptionalAction)
args = parser.parse_args()

should_title = args.t
should_indent = args.i
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

      # attempt to fix bylines
      formatted = []
      if bylines.startswith('By ') or bylines.startswith('BY '):
        bylines = bylines[3:]
      andsplit = re.split(' and | AND ', bylines)
      if len(andsplit) == 2:
        # 2 or more bylines

        # add first half
        commasplit = andsplit[0].split(',')
        for byline in commasplit:
          trimmed = byline.strip()
          if len(trimmed) > 0:
            formatted.append(trimmed.title() if should_title else trimmed)

        # add second half
        formatted.append(andsplit[1].strip().title() if should_title else andsplit[1].strip())
      else:
        # solo byline
        formatted.append(bylines.title() if should_title else bylines)
      
      articles.append({
        'page': page_num,
        'title': title,
        'bylines': formatted,
      })

    content.append({
      'name': section,
      'articles': articles,
    })


json_str = json.dumps(
  content,
  indent=2 if should_indent else None,
  separators=(',', ':'),
  ensure_ascii=False
)
print(json_str)