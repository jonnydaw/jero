echo "Testcafe tests:"
npx testcafe chrome:headless jero-testing/userStoryTesting/english/navbar/guestDropdown.js

if [ $? -eq 1 ]; then
    echo "Testcafe tests failed. ༼ つ ಥ_ಥ ༽つ"
    exit 1
else
    echo "Testcafe tests passed. ༼ つ  ͡° ͜ʖ ͡° ༽つ"

fi




echo "Jest Tests:"
(cd jero-frontend; npm run test)

if [ $? -eq 1 ]; then
    echo "jest test failed tests failed. ༼ つ ಥ_ಥ ༽つ"
    exit 1
else
    echo "Jest tests passed. ༼ つ  ͡° ͜ʖ ͡° ༽つ"
fi
echo "Proceed with commit. \ (•◡•) /"
exit 0