echo ""
echo "####################################################"
echo "### Pulling most recent version from remote repo ###"
echo "####################################################"

git reset --hard
git pull

echo ""
echo "#########################"
echo "### Rebuilding client ###"
echo "#########################"

cd client
npm install
npm run build

echo ""
echo "#########################"
echo "### Rebuilding server ###"
echo "#########################"

cd ../server
npm install
tsc

echo ""
echo "###############################"
echo "### Restarting node service ###"
echo "###############################"

service node restart

echo "Done!"