import sys
import json
import re

groups = []

while True:
  group = input().strip()

  if group == 'END':
    break

  if group != '':
    has_titles = input().strip() == "Y"
    num_people = int(input().strip())
    people = []

    for i in range(num_people):
      byline = input().strip()
      title = input().strip() if has_titles else ''
      if has_titles:
        input() # extra space for formatting
      
      people.append({
        'byline': byline.title(),
        # 'byline': byline,
        'title': title,
      })

    if not has_titles:
      input() # extra space for formatting

    groups.append({
      'name': group,
      'people': people,
    })


json_str = json.dumps(
  groups,
  indent=2,
  separators=(',', ':'),
  ensure_ascii=False
)
print(json_str)