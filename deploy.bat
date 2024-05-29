cd dist

git init .
git add .
git commit -m "deploy"
git branch -m gh-pages
git remote add origin https://github.com/theguidon/theguidon-archives.git
git push -u origin gh-pages

cd ..